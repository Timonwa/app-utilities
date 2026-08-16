import { formatDateToRelativeShort } from "./format-date-to-relative-short.js";

/** @example formatISOToRelativeShort(new Date(Date.now() - 300_000).toISOString()) // "5m ago" */
export function formatISOToRelativeShort(isoString: string): string {
  if (typeof isoString !== "string" || !isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return formatDateToRelativeShort(date);
}
