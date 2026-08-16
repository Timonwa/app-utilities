import { MILLIS_PER_MINUTE } from "./millis-constants.js";

/**
 * Adds minutes to a milliseconds timestamp.
 * @param millis - Source milliseconds
 * @param minutes - Minutes to add (negative subtracts)
 * @returns New milliseconds
 * @example addMinutesToMillis(1705276800000, 30) // 30 minutes later in millis
 */
export function addMinutesToMillis(millis: number, minutes: number): number {
  return millis + minutes * MILLIS_PER_MINUTE;
}
