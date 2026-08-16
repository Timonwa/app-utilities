import { readErrorProp } from "./_shared.js";
import { getErrorStatusCode } from "./get-error-status-code.js";
import { isHttpError } from "./is-http-error.js";

/**
 * The Retry-After delay of a 429 response, in whole seconds — the header first, then a
 * structured `response.data.error.details.retryAfter` fallback. `undefined` for
 * anything that is not a rate-limit error, so callers gate on it directly.
 *
 * @example getErrorRetryAfterSeconds(err) // 30
 */
export function getErrorRetryAfterSeconds(error: unknown): number | undefined {
  if (!isHttpError(error) || getErrorStatusCode(error) !== 429) return undefined;

  const header = error.response?.headers?.["retry-after"];
  if (header) {
    const seconds = Number(header);
    if (!Number.isNaN(seconds) && seconds > 0) return Math.ceil(seconds);
  }

  const details = readErrorProp(readErrorProp(error.response?.data, "error"), "details");
  const retryAfter = readErrorProp(details, "retryAfter");
  if (typeof retryAfter === "number") return Math.ceil(retryAfter);

  return undefined;
}
