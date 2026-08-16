import { isDateToday } from "./is-date-today.js";

/**
 * Checks whether a milliseconds timestamp falls on today's local date.
 * @example isMillisToday(Date.now()) // true
 */
export function isMillisToday(millis: number): boolean {
  return Number.isFinite(millis) && isDateToday(new Date(millis));
}
