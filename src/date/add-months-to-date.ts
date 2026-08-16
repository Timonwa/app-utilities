import { addMonths } from "date-fns";

/**
 * Adds months, clamping to the last day when the target month is shorter — Jan 31 + 1
 * month is Feb 29/28, not Mar 2/3 the way a raw `setMonth` overflows.
 *
 * @example addMonthsToDate(new Date("2024-01-31"), 1) // Date for 2024-02-29
 */
export function addMonthsToDate(date: Date, months: number): Date {
  return addMonths(date, months);
}
