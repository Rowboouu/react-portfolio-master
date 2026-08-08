/**
 * Contact form endpoint. Validates the submission, then hands it to Resend.
 */

import { isConfigured, sendEmail } from "../../../lib/email";
import { clientIp, rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: 120,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const json = (body: unknown, status: number, extra?: HeadersInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });

const field = (source: Record<string, unknown>, key: string) => {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
};

export async function POST(request: Request) {
  if (!isConfigured()) {
    return json(
      {
        error:
          "The contact form is not configured yet. Please email me directly instead.",
      },
      503,
    );
  }

  const limit = rateLimit(
    "contact",
    clientIp(request.headers),
    RATE_LIMIT,
    RATE_WINDOW_MS,
  );
  if (!limit.ok) {
    return json(
      { error: "Too many submissions. Please try again in a few minutes." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Malformed request body." }, 400);
  }

  // Honeypot: real users never see this input, so anything in it is a bot.
  // Report success so the bot has no signal to retry against.
  if (field(payload, "website")) {
    return json({ ok: true }, 200);
  }

  const name = field(payload, "name");
  const email = field(payload, "email");
  const subject = field(payload, "subject");
  const message = field(payload, "message");

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!email) errors.email = "Please add an email so I can reply.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email))
    errors.email = "That doesn't look like a valid email address.";

  if (subject.length > LIMITS.subject) errors.subject = "That subject is too long.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10)
    errors.message = "Could you add a little more detail?";
  else if (message.length > LIMITS.message)
    errors.message = "That message is too long.";

  if (Object.keys(errors).length > 0) {
    return json({ error: "Please check the form.", errors }, 400);
  }

  const result = await sendEmail({
    subject: subject
      ? `Portfolio contact: ${subject}`
      : `Portfolio contact from ${name}`,
    fields: [
      ["Name", name],
      ["Email", email],
      ...(subject ? ([["Subject", subject]] as Array<[string, string]>) : []),
      ["Message", message],
      ["Source", "Portfolio contact form"],
    ],
    replyTo: email,
  });

  if (!result.ok) {
    return json({ error: result.error }, result.status);
  }

  return json({ ok: true }, 200);
}
