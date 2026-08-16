import { getEndOfDayMillis } from "./get-end-of-day-millis.js";

/**
 * Gets the end of today in milliseconds.
 * @returns Milliseconds at end of today
 * @example getEndOfTodayMillis() // End-of-today millis
 */
export function getEndOfTodayMillis(): number {
  return getEndOfDayMillis(Date.now());
}
