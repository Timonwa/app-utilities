import { formatDateToShortDate } from "./format-date-to-short-date.js";

/** @example formatMillisToShortDate(new Date(2024, 0, 15).getTime(), "en-US") // "1/15/24" */
export function formatMillisToShortDate(millis: number, locale?: string): string {
  return formatDateToShortDate(new Date(millis), locale);
}
