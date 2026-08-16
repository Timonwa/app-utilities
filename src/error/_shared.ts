export function readErrorProp(value: unknown, key: string): unknown {
  if (typeof value !== "object" || value === null) return undefined;
  return (value as Record<string, unknown>)[key];
}

/** Duck-types a Firebase-shaped error (`name === "FirebaseError"`) without importing
 *  Firebase — shape detection is generic even though the SDK is not. */
export function asFirebaseShapedError(
  value: unknown,
): { code: string | undefined; message: string | undefined } | null {
  if (readErrorProp(value, "name") !== "FirebaseError") return null;
  const code = readErrorProp(value, "code");
  const message = readErrorProp(value, "message");
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
}

/** Maps an error code to a user-facing message. Passed in by the app — which codes mean
 *  what is product knowledge (a Firebase auth map, an API error catalogue), and the
 *  package only owns the unwrapping and precedence. */
export type ErrorMessageResolver = (code: string) => string | undefined;

export interface FormatErrorOptions {
  /** Returned when nothing usable can be extracted. */
  fallback?: string;
  /** Resolves a structured error code to a friendly message — e.g. the app's
   *  Firebase `auth/*` map. */
  messageForCode?: ErrorMessageResolver;
}

export const DEFAULT_ERROR_FALLBACK = "An unknown error occurred";
