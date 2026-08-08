/**
 * Resend transport, shared by the contact form and the chat agent's
 * meeting-request tool. Uses the REST API directly so no extra dependency is
 * needed — the payload is a handful of fields.
 */

import { contactConfig } from "../content_option";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * `onboarding@resend.dev` is Resend's shared sender: it needs no domain
 * verification but may only deliver to the address that owns the Resend
 * account. Set CONTACT_FROM_EMAIL to an address on a verified domain to lift
 * that restriction.
 */
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Header injection guard: newlines in a subject or display name would let a
 * submitter append their own headers.
 */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export type SendEmailInput = {
  subject: string;
  /** Ordered field name → value pairs rendered as the email body. */
  fields: Array<[string, string]>;
  /** Visitor address, used for Reply-To so replying goes straight to them. */
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export const isConfigured = () => Boolean(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  subject,
  fields,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Email is not configured.", status: 503 };
  }

  const to = process.env.CONTACT_TO_EMAIL || contactConfig.YOUR_EMAIL_1;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  const text = fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
${fields
  .map(
    ([label, value]) =>
      `<p style="margin:0 0 16px"><strong style="display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8a8a8a;margin-bottom:4px">${escapeHtml(
        label,
      )}</strong>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
  )
  .join("\n")}
</div>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: singleLine(subject),
        text,
        html,
        ...(replyTo ? { reply_to: [singleLine(replyTo)] } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Resend send failed", response.status, detail);
      return {
        ok: false,
        error: "The email service rejected the message.",
        status: 502,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Resend request threw", error);
    return { ok: false, error: "Could not reach the email service.", status: 502 };
  }
};
