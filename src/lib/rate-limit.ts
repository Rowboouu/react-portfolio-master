/**
 * Small fixed-window rate limiter for the public API routes.
 *
 * State lives in the module scope, so on serverless it is per-instance rather
 * than global — a determined abuser spread across cold starts can exceed the
 * limit. That is an accepted trade-off here: this exists to stop casual
 * hammering of the Gemini and Resend quotas, not as a security boundary.
 */

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Map<string, Window>>();

/** Trailing-proxy-safe client IP. Vercel always sets x-forwarded-for. */
export const clientIp = (headers: Headers) => {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
};

export const rateLimit = (
  bucket: string,
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfter: number } => {
  const now = Date.now();

  let windows = buckets.get(bucket);
  if (!windows) {
    windows = new Map();
    buckets.set(bucket, windows);
  }

  // Opportunistic cleanup so the map cannot grow without bound.
  if (windows.size > 500) {
    for (const [existing, window] of windows) {
      if (window.resetAt <= now) windows.delete(existing);
    }
  }

  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { ok: true, retryAfter: 0 };
};
