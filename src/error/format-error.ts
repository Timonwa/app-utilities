import {
  asFirebaseShapedError,
  DEFAULT_ERROR_FALLBACK,
  type FormatErrorOptions,
  readErrorProp,
} from "./_shared.js";
import { isHttpError } from "./is-http-error.js";

/**
 * One displayable string from an error of any shape — HTTP-like, Firebase-shaped,
 * `Error`, or a bare string.
 *
 * The code-to-message map is the caller's: pass `messageForCode` (e.g. your Firebase
 * `auth/*` catalogue) and structured codes resolve through it. Which codes mean what is
 * product knowledge; this owns only the unwrapping and the precedence.
 *
 * @example formatError(err) // "Request failed: /events"
 * @example formatError(err, { messageForCode: (c) => AUTH_MESSAGES[c] })
 */
export function formatError(error: unknown, options: FormatErrorOptions = {}): string {
  const { fallback, messageForCode } = options;

  if (isHttpError(error)) {
    const message = readErrorProp(error.response?.data, "message");
    if (typeof message === "string" && message) return message;
    if (typeof error.message === "string" && error.message) return error.message;
  }

  const firebaseShaped = asFirebaseShapedError(error);
  if (firebaseShaped) {
    const resolved = firebaseShaped.code
      ? messageForCode?.(firebaseShaped.code)
      : undefined;
    return resolved ?? firebaseShaped.message ?? fallback ?? DEFAULT_ERROR_FALLBACK;
  }

  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback || DEFAULT_ERROR_FALLBACK;
}
