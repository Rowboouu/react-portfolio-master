### My own personal portfolio

Next.js 15 (App Router) + TypeScript. `pnpm dev` to run, `pnpm build` to build.

Most site copy — bio, work history, achievements, services, projects, contact
details — lives in [`src/content_option.ts`](src/content_option.ts). The chat
assistant's knowledge is generated from that same file, so editing it keeps the
site and the bot in sync.

#### Environment

Copy [`.env.example`](.env.example) to `.env.local` (or set the values in the
Vercel project settings):

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | for chat | Google Gemini key ([AI Studio](https://aistudio.google.com/apikey)) |
| `GEMINI_MODEL` | no | Model override; defaults to `gemini-3.6-flash` |
| `RESEND_API_KEY` | for email | Resend key ([API keys](https://resend.com/api-keys)) |
| `CONTACT_TO_EMAIL` | no | Recipient; defaults to `contactConfig.YOUR_EMAIL_1` |
| `CONTACT_FROM_EMAIL` | no | Sender; defaults to Resend's shared `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | no | Absolute OG/canonical URLs; auto-detected on Vercel |

Both features fail soft: with no key set, the chat widget and contact form
return a 503 and tell visitors to email directly instead of erroring.

`onboarding@resend.dev` needs no DNS setup but only delivers to the address that
owns the Resend account — enough for a contact form pointed at your own inbox.
Verify a domain in Resend and set `CONTACT_FROM_EMAIL` to send from it.

#### Chat assistant

A floating widget ([`src/components/chatbot/`](src/components/chatbot/)) talking
to [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts), which streams from
Gemini as newline-delimited JSON. It answers questions about Brian and can book
meetings: a `submit_meeting_request` tool emails the request through Resend, the
same transport the contact form uses
([`src/lib/email.ts`](src/lib/email.ts)).

Both API routes are rate-limited per IP
([`src/lib/rate-limit.ts`](src/lib/rate-limit.ts)) — in-memory, so on serverless
it is per-instance and meant to blunt casual abuse of the API quotas rather than
act as a security boundary.
