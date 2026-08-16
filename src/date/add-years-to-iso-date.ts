import { addYears } from "date-fns";

/**
 * Adds calendar years to an ISO date string and returns a new ISO string, clamping Feb 29 to Feb 28 in a non-leap target year.
 * @example addYearsToISODate("2024-02-29T00:00:00.000Z", 1) // "2025-02-28T00:00:00.000Z"
 */
export function addYearsToISODate(isoString: string, years: number): string {
  return addYears(new Date(isoString), years).toISOString();
}
