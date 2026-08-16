import { addMonthsToISODate } from "./add-months-to-iso-date.js";

/**
 * Subtracts calendar months from an ISO date string and returns a new ISO string, clamping to the last day when the target month is shorter.
 * @example subtractMonthsFromISODate(isoString, 2) // 2 months earlier
 */
export function subtractMonthsFromISODate(isoString: string, months: number): string {
  return addMonthsToISODate(isoString, -months);
}
