import { formatDateToRelative } from "./format-date-to-relative.js";

/**
 * Relative time from an ISO string — one implementation for the whole package, so the
 * Date and ISO versions can never drift apart.
 *
 * @example formatISOToRelative(new Date(Date.now() - 7_200_000).toISOString()) // "2 hours ago"
 */
export function formatISOToRelative(isoString: string, locale?: string): string {
  if (typeof isoString !== "string" || !isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return formatDateToRelative(date, locale);
}
