/**
 * The structural shape of an HTTP error from any client — axios, ky, a fetch wrapper, a
 * typed server error. Duck-typed on purpose: depending on one client library would make
 * every consumer install it.
 */
export interface HttpErrorLikeProps {
  message?: string;
  status?: number;
  code?: string;
  response?: {
    status?: number;
    headers?: Record<string, unknown> | undefined;
    data?: unknown;
  };
  isAxiosError?: boolean;
}

/**
 * Narrows an unknown value to an HTTP-shaped error — anything carrying a numeric `status`, a `response.status`, or an `isAxiosError` flag.
 *
 * @example isHttpError({ response: { status: 404 } }) // true
 */
export function isHttpError(error: unknown): error is HttpErrorLikeProps {
  if (typeof error !== "object" || error === null) return false;
  const candidate = error as HttpErrorLikeProps;
  if (candidate.isAxiosError === true) return true;
  if (typeof candidate.status === "number") return true;
  return (
    typeof candidate.response === "object" &&
    candidate.response !== null &&
    typeof candidate.response.status === "number"
  );
}
