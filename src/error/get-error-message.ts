import { isError } from "./is-error.js";
import { isHttpError } from "./is-http-error.js";

/**
 * A displayable message from an unknown error, drilling into
 * `response.data.{message,error,errors}` when present.
 *
 * @example getErrorMessage(err) // "Event not found"
 */
export function getErrorMessage(error: unknown): string {
  if (isHttpError(error)) {
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const data = responseData as Record<string, unknown>;
      if (typeof data.message === "string") return data.message;
      if (typeof data.error === "string") return data.error;
      if (typeof data.errors === "string") return data.errors;
      if (Array.isArray(data.errors) && data.errors.length > 0)
        return data.errors.join(", ");
    }

    return error.message || "An unexpected error occurred";
  }

  if (isError(error)) return error.message;
  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  return "An unexpected error occurred";
}
