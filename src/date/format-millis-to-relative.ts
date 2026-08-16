import { formatDateToRelative } from "./format-date-to-relative.js";

/**
 * Formats a milliseconds timestamp as a relative time like "2 hours ago", returning an empty string for non-finite input.
 * @example formatMillisToRelative(Date.now() - 7_200_000) // "2 hours ago"
 */
export function formatMillisToRelative(millis: number, locale?: string): string {
  if (!Number.isFinite(millis)) return "";
  return formatDateToRelative(new Date(millis), locale);
}
