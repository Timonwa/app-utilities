import { formatDateToRelativeShort } from "./format-date-to-relative-short.js";

/**
 * Formats an ISO date string as a short relative time like "5m ago", returning an empty string for invalid input.
 * @example formatISOToRelativeShort(new Date(Date.now() - 300_000).toISOString()) // "5m ago"
 */
export function formatISOToRelativeShort(isoString: string): string {
  if (typeof isoString !== "string" || !isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return formatDateToRelativeShort(date);
}
