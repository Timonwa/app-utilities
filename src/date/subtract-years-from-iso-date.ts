import { addYearsToISODate } from "./add-years-to-iso-date.js";

/**
 * Subtracts calendar years from an ISO date string and returns a new ISO string, clamping Feb 29 to Feb 28 in a non-leap target year.
 * @example subtractYearsFromISODate(isoString, 2) // 2 years earlier
 */
export function subtractYearsFromISODate(isoString: string, years: number): string {
  return addYearsToISODate(isoString, -years);
}
