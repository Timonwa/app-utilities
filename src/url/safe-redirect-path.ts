/**
 * Validates a `?redirect=...` query value before pushing the user to it.
 * Accepts only same-origin paths: must start with a single "/" and contain
 * no scheme. Rejects `//evil.com`, `/\evil.com`, and `https://evil.com` so
 * an attacker can't craft `/login?redirect=https://evil.com` and bounce
 * authenticated users to a phishing site. Also rejects percent-encoded
 * variants (e.g. `/%2Fevil.com`, `/%5Cevil.com`) that would otherwise
 * slip past raw-prefix checks before being decoded by the browser.
 * @param redirect - Candidate redirect path
 * @param fallback - Path to use when `redirect` is unsafe
 * @returns The redirect when safe, otherwise the fallback
 * @example safeRedirectPath("/account", "/") // "/account"
 */
export function safeRedirectPath(redirect: string | undefined, fallback: string): string {
  if (!redirect) return fallback;
  if (!redirect.startsWith("/")) return fallback;
  if (redirect.startsWith("//") || redirect.startsWith("/\\")) return fallback;
  if (redirect.includes(":")) return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(redirect);
  } catch {
    return fallback;
  }
  if (!decoded.startsWith("/")) return fallback;
  if (decoded.startsWith("//") || decoded.startsWith("/\\")) return fallback;
  if (decoded.includes(":")) return fallback;

  try {
    const url = new URL(redirect, "http://localhost");
    if (url.origin !== "http://localhost") return fallback;
  } catch {
    return fallback;
  }

  return redirect;
}
