/**
 * Chat agent backing the site's floating assistant.
 *
 * Replaces the old hosted n8n webhook: the model call, the system prompt, the
 * meeting-request tool, and the wire format all live here, so the behaviour is
 * editable in this repo instead of in an external workflow builder.
 *
 * Responds with newline-delimited JSON (one event object per line) so the
 * client can render tokens as they arrive without pulling in an SSE library.
 */

import {
  GoogleGenAI,
  Type,
  type Content,
  type FunctionCall,
  type FunctionDeclaration,
  type Part,
} from "@google/genai";
import { buildSystemInstruction } from "../../../lib/agent-knowledge";
import { isConfigured, sendEmail } from "../../../lib/email";
import { clientIp, rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * 3.6-flash over 3.5-flash: same intelligence tier, but better at multi-step
 * tool calling (which is this agent's hard path — the meeting-request flow),
 * fewer output tokens for the same work, and a lower output rate.
 */
const DEFAULT_MODEL = "gemini-3.6-flash";

/** Guardrails on what a single visitor can push through one request. */
const MAX_MESSAGES = 24;
const MAX_MESSAGE_CHARS = 2000;
/** A tool call plus its follow-up answer needs 2; 3 leaves one spare round. */
const MAX_TOOL_ROUNDS = 3;

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 5 * 60 * 1000;

type ClientMessage = { role: "user" | "assistant"; content: string };

type StreamEvent =
  | { type: "text"; value: string }
  | { type: "tool"; name: string; status: "running" | "ok" | "error" }
  | { type: "error"; message: string }
  | { type: "done" };

const MEETING_TOOL: FunctionDeclaration = {
  name: "submit_meeting_request",
  description:
    "Email Brian a meeting request on the visitor's behalf. Only call this once the visitor has supplied their name, a real email address, and what they want to discuss. Never guess or placeholder any value.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The visitor's full name, as they gave it.",
      },
      email: {
        type: Type.STRING,
        description:
          "The visitor's email address. Brian replies here, so it must be the real address they provided.",
      },
      purpose: {
        type: Type.STRING,
        description:
          "What the visitor wants to discuss or the reason for the meeting.",
      },
      preferred_time: {
        type: Type.STRING,
        description:
          "The visitor's preferred date and/or time in their own words, e.g. 'next Tuesday afternoon'. Omit if they had no preference.",
      },
      timezone: {
        type: Type.STRING,
        description:
          "The visitor's timezone if they mentioned one, e.g. 'GMT+8'. Omit otherwise.",
      },
      company: {
        type: Type.STRING,
        description: "The visitor's company or organisation, if mentioned.",
      },
      notes: {
        type: Type.STRING,
        description: "Any other context worth passing on to Brian.",
      },
    },
    required: ["name", "email", "purpose"],
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const asText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

/**
 * Runs the meeting-request tool. The returned object is handed straight back to
 * the model, so the wording doubles as the model's instruction for what to tell
 * the visitor next.
 */
const submitMeetingRequest = async (args: Record<string, unknown>) => {
  const name = asText(args.name);
  const email = asText(args.email);
  const purpose = asText(args.purpose);

  if (!name || !email || !purpose) {
    return {
      ok: false as const,
      output:
        "Rejected: name, email and purpose are all required. Ask the visitor for whichever is missing.",
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      ok: false as const,
      output: `Rejected: "${email}" is not a valid email address. Ask the visitor to confirm it.`,
    };
  }

  if (!isConfigured()) {
    return {
      ok: false as const,
      output:
        "Failed: the email service is not configured on this deployment. Tell the visitor to email Brian directly.",
    };
  }

  const fields: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Purpose", purpose],
  ];

  const company = asText(args.company);
  const preferredTime = asText(args.preferred_time);
  const timezone = asText(args.timezone);
  const notes = asText(args.notes);

  if (company) fields.push(["Company", company]);
  if (preferredTime) fields.push(["Preferred time", preferredTime]);
  if (timezone) fields.push(["Timezone", timezone]);
  if (notes) fields.push(["Notes", notes]);
  fields.push(["Source", "Portfolio chat assistant"]);

  const result = await sendEmail({
    subject: `Meeting request from ${name}`,
    fields,
    replyTo: email,
  });

  if (!result.ok) {
    return {
      ok: false as const,
      output: `Failed to send: ${result.error} Tell the visitor to email Brian directly instead.`,
    };
  }

  return {
    ok: true as const,
    output:
      "Sent. Brian has received the meeting request by email and will reply to the address provided.",
  };
};

/** Trims and truncates client history into Gemini `Content` turns. */
const toGeminiContents = (messages: ClientMessage[]): Content[] =>
  messages.slice(-MAX_MESSAGES).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content.slice(0, MAX_MESSAGE_CHARS) }],
  }));

const jsonError = (message: string, status: number, extra?: HeadersInit) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonError(
      "The chat assistant is not configured yet. Please use the contact form or email instead.",
      503,
    );
  }

  const limit = rateLimit(
    "chat",
    clientIp(request.headers),
    RATE_LIMIT,
    RATE_WINDOW_MS,
  );
  if (!limit.ok) {
    return jsonError(
      "That's a lot of questions in a short time. Please wait a moment and try again.",
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Malformed request body.", 400);
  }

  const rawMessages = (payload as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return jsonError("`messages` must be a non-empty array.", 400);
  }

  const messages: ClientMessage[] = [];
  for (const entry of rawMessages) {
    const role = (entry as ClientMessage)?.role;
    const content = (entry as ClientMessage)?.content;
    if (role !== "user" && role !== "assistant") {
      return jsonError("Each message needs role 'user' or 'assistant'.", 400);
    }
    if (typeof content !== "string" || !content.trim()) {
      return jsonError("Each message needs non-empty string content.", 400);
    }
    messages.push({ role, content: content.trim() });
  }

  if (messages[messages.length - 1].role !== "user") {
    return jsonError("The last message must come from the user.", 400);
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const contents = toGeminiContents(messages);
  const systemInstruction = buildSystemInstruction();

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: StreamEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        } catch {
          // The client hung up (the widget aborts in-flight requests when it
          // unmounts). Stop writing rather than letting the throw escape into
          // the error handler, which would try to enqueue again.
          closed = true;
        }
      };

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
          const response = await ai.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 1200,
              tools: [{ functionDeclarations: [MEETING_TOOL] }],
            },
          });

          // Raw parts are echoed back verbatim on the next round so Gemini 3
          // thought signatures survive the round trip; stripping them breaks
          // multi-turn function calling.
          const modelParts: Part[] = [];
          const calls: FunctionCall[] = [];

          for await (const chunk of response) {
            for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
              modelParts.push(part);
              if (part.functionCall) {
                calls.push(part.functionCall);
              } else if (part.text && !part.thought) {
                send({ type: "text", value: part.text });
              }
            }
          }

          if (calls.length === 0) break;

          contents.push({ role: "model", parts: modelParts });

          const responseParts: Part[] = [];
          for (const call of calls) {
            const name = call.name ?? "unknown";
            send({ type: "tool", name, status: "running" });

            const result =
              name === MEETING_TOOL.name
                ? await submitMeetingRequest(call.args ?? {})
                : {
                    ok: false as const,
                    output: `Unknown tool "${name}".`,
                  };

            send({ type: "tool", name, status: result.ok ? "ok" : "error" });
            responseParts.push({
              functionResponse: {
                ...(call.id ? { id: call.id } : {}),
                name,
                response: { output: result.output },
              },
            });
          }

          contents.push({ role: "user", parts: responseParts });
        }

        send({ type: "done" });
      } catch (error) {
        console.error("Chat stream failed", error);
        send({
          type: "error",
          message:
            "Something went wrong on my end. Please try again, or email Brian directly.",
        });
      } finally {
        closed = true;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
