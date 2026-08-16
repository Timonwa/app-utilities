import { isHttpError } from "./is-http-error.js";

/** @example getErrorStatusCode(err) // 404 */
export function getErrorStatusCode(error: unknown): number | undefined {
  if (!isHttpError(error)) return undefined;
  return error.response?.status ?? error.status;
}
