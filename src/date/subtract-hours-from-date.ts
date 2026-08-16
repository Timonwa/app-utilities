import { addHoursToDate } from "./add-hours-to-date.js";

/**
 * Subtracts hours from a Date.
 * @example subtractHoursFromDate(date, 2) // 2 hours earlier
 */
export function subtractHoursFromDate(date: Date, hours: number): Date {
  return addHoursToDate(date, -hours);
}
