import { addYears } from "date-fns";

/**
 * Adds years, clamping Feb 29 to Feb 28 in a non-leap target year rather than
 * overflowing to Mar 1.
 *
 * @example addYearsToDate(new Date("2024-02-29"), 1) // Date for 2025-02-28
 */
export function addYearsToDate(date: Date, years: number): Date {
  return addYears(date, years);
}
