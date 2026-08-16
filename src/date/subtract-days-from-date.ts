import { addDaysToDate } from "./add-days-to-date.js";

/** @example subtractDaysFromDate(new Date("2024-01-15"), 5) // Date for 2024-01-10 */
export function subtractDaysFromDate(date: Date, days: number): Date {
  return addDaysToDate(date, -days);
}
