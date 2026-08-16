import { addYearsToDate } from "./add-years-to-date.js";

/**
 * Subtracts calendar years from a Date, clamping Feb 29 to Feb 28 in a non-leap target year.
 * @example subtractYearsFromDate(date, 2) // 2 years earlier
 */
export function subtractYearsFromDate(date: Date, years: number): Date {
  return addYearsToDate(date, -years);
}
