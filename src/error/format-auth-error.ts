import {
  asFirebaseShapedError,
  DEFAULT_ERROR_FALLBACK,
  type FormatErrorOptions,
  readErrorProp,
} from "./_shared.js";

/**
 * Like `formatError`, but unwraps `response.data.error` FIRST — auth providers wrap the
 * real error there, and the outer envelope's message ("Request failed with status 400")
 * is never the one to show a user.
 *
 * @example formatAuthError(err, { messageForCode: (c) => AUTH_MESSAGES[c] }) // "Incorrect password"
 */
export function formatAuthError(
  error: unknown,
  options: FormatErrorOptions = {},
): string {
  const { fallback, messageForCode } = options;
  const inner = readErrorProp(
    readErrorProp(readErrorProp(error, "response"), "data"),
    "error",
  );
  const unwrapped = inner ?? error;

  const firebaseShaped = asFirebaseShapedError(unwrapped);
  if (firebaseShaped) {
    const resolved = firebaseShaped.code
      ? messageForCode?.(firebaseShaped.code)
      : undefined;
    return resolved ?? firebaseShaped.message ?? fallback ?? DEFAULT_ERROR_FALLBACK;
  }

  if (unwrapped instanceof Error) return unwrapped.message;
  if (typeof unwrapped === "string") return unwrapped;
  return fallback || DEFAULT_ERROR_FALLBACK;
}
