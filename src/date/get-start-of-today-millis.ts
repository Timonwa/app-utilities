import { getStartOfDayMillis } from "./get-start-of-day-millis.js";

/**
 * Gets the start of today in milliseconds.
 * @returns Milliseconds at start of today
 * @example getStartOfTodayMillis() // Start-of-today millis
 */
export function getStartOfTodayMillis(): number {
  return getStartOfDayMillis(Date.now());
}
