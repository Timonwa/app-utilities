import { getErrorStatusCode } from "./get-error-status-code.js";

/** @example hasErrorStatusCode(err, 404) // true */
export function hasErrorStatusCode(error: unknown, statusCode: number): boolean {
  return getErrorStatusCode(error) === statusCode;
}
