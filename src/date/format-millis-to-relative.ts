import { formatDateToRelative } from "./format-date-to-relative.js";

/** @example formatMillisToRelative(Date.now() - 7_200_000) // "2 hours ago" */
export function formatMillisToRelative(millis: number, locale?: string): string {
  if (!Number.isFinite(millis)) return "";
  return formatDateToRelative(new Date(millis), locale);
}
