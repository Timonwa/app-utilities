import { MILLIS_PER_DAY } from "./millis-constants.js";

/**
 * Adds days to a milliseconds timestamp.
 * @param millis - Source milliseconds
 * @param days - Days to add (negative subtracts)
 * @returns New milliseconds
 * @example addDaysToMillis(1705276800000, 5) // 5 days later in millis
 */
export function addDaysToMillis(millis: number, days: number): number {
  return millis + days * MILLIS_PER_DAY;
}
