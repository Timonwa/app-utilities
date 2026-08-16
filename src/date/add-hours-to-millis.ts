import { MILLIS_PER_HOUR } from "./millis-constants.js";

/**
 * Adds hours to a milliseconds timestamp.
 * @param millis - Source milliseconds
 * @param hours - Hours to add (negative subtracts)
 * @returns New milliseconds
 * @example addHoursToMillis(1705276800000, 3) // 3 hours later in millis
 */
export function addHoursToMillis(millis: number, hours: number): number {
  return millis + hours * MILLIS_PER_HOUR;
}
