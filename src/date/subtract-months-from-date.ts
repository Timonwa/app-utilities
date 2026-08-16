import { addMonthsToDate } from "./add-months-to-date.js";

/** @example subtractMonthsFromDate(date, 2) // 2 months earlier */
export function subtractMonthsFromDate(date: Date, months: number): Date {
  return addMonthsToDate(date, -months);
}
