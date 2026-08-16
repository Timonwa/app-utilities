import { formatDateToRelativeShort } from "./format-date-to-relative-short.js";

/**
 * Formats a milliseconds timestamp as a short relative time like "5m ago", returning an empty string for non-finite input.
 * @example formatMillisToRelativeShort(Date.now() - 300_000) // "5m ago"
 */
export function formatMillisToRelativeShort(millis: number): string {
  if (!Number.isFinite(millis)) return "";
  return formatDateToRelativeShort(new Date(millis));
}
