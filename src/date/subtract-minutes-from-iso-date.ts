import { addMinutesToISODate } from "./add-minutes-to-iso-date.js";

/**
 * Subtracts minutes from an ISO date string and returns a new ISO string.
 * @example subtractMinutesFromISODate(isoString, 2) // 2 minutes earlier
 */
export function subtractMinutesFromISODate(isoString: string, minutes: number): string {
  return addMinutesToISODate(isoString, -minutes);
}
