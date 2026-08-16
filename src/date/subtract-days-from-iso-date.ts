import { addDaysToISODate } from "./add-days-to-iso-date.js";

/**
 * Subtracts days from an ISO date string and returns a new ISO string.
 * @example subtractDaysFromISODate("2024-01-15T00:00:00.000Z", 5) // "2024-01-10T00:00:00.000Z"
 */
export function subtractDaysFromISODate(isoString: string, days: number): string {
  return addDaysToISODate(isoString, -days);
}
