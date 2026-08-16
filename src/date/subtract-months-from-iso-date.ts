import { addMonthsToISODate } from "./add-months-to-iso-date.js";

/** @example subtractMonthsFromISODate(isoString, 2) // 2 months earlier */
export function subtractMonthsFromISODate(isoString: string, months: number): string {
  return addMonthsToISODate(isoString, -months);
}
