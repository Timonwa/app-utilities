import { getErrorStatusCode } from "./get-error-status-code.js";

/**
 * Checks whether an error carries a specific HTTP status code.
 *
 * @example hasErrorStatusCode(err, 404) // true
 */
export function hasErrorStatusCode(error: unknown, statusCode: number): boolean {
  return getErrorStatusCode(error) === statusCode;
}
