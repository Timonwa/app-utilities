import { addMonthsToDate } from "./add-months-to-date.js";

/**
 * Subtracts calendar months from a Date, clamping to the last day when the target month is shorter.
 * @example subtractMonthsFromDate(date, 2) // 2 months earlier
 */
export function subtractMonthsFromDate(date: Date, months: number): Date {
  return addMonthsToDate(date, -months);
}
