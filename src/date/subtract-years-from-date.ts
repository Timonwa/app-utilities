import { addYearsToDate } from "./add-years-to-date.js";

/** @example subtractYearsFromDate(date, 2) // 2 years earlier */
export function subtractYearsFromDate(date: Date, years: number): Date {
  return addYearsToDate(date, -years);
}
