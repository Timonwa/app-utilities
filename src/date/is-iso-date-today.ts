import { isDateToday } from "./is-date-today.js";

/**
 * Checks whether an ISO date string falls on today's local date.
 * @example isISODateToday(new Date().toISOString()) // true
 */
export function isISODateToday(isoString: string): boolean {
  const date = new Date(isoString);
  return !Number.isNaN(date.getTime()) && isDateToday(date);
}
