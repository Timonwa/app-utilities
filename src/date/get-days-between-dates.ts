import { differenceInCalendarDays } from "date-fns";

/**
 * Whole calendar days between two dates, always positive. Counts day boundaries
 * crossed, so Jan 1 23:00 to Jan 2 01:00 is 1 day — the `Math.ceil`-of-elapsed-time
 * approach called 25 hours 2 days.
 *
 * @example getDaysBetweenDates(new Date("2024-01-01"), new Date("2024-01-15")) // 14
 */
export function getDaysBetweenDates(dateA: Date, dateB: Date): number {
  return Math.abs(differenceInCalendarDays(dateB, dateA));
}
