import { isHttpError } from "./is-http-error.js";

/**
 * Reads the HTTP status code from an HTTP-shaped error, preferring `response.status` over `status`, and returns `undefined` for anything that is not one.
 *
 * @example getErrorStatusCode(err) // 404
 */
export function getErrorStatusCode(error: unknown): number | undefined {
  if (!isHttpError(error)) return undefined;
  return error.response?.status ?? error.status;
}
