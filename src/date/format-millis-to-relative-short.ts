import { formatDateToRelativeShort } from "./format-date-to-relative-short.js";

/** @example formatMillisToRelativeShort(Date.now() - 300_000) // "5m ago" */
export function formatMillisToRelativeShort(millis: number): string {
  if (!Number.isFinite(millis)) return "";
  return formatDateToRelativeShort(new Date(millis));
}
