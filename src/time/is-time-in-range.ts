import { getTimeDifferenceInMillis } from "./get-time-difference-in-millis.js";

/**
 * Checks whether an HH:MM time string is within an inclusive range.
 * @param time - Time to check (HH:MM)
 * @param startTime - Range start (HH:MM)
 * @param endTime - Range end (HH:MM)
 * @returns True if within range
 * @example isTimeInRange("14:00", "09:00", "17:00") // true
 */
export function isTimeInRange(time: string, startTime: string, endTime: string): boolean {
  const timeMs = getTimeDifferenceInMillis("00:00", time);
  const startMs = getTimeDifferenceInMillis("00:00", startTime);
  const endMs = getTimeDifferenceInMillis("00:00", endTime);
  return timeMs >= startMs && timeMs <= endMs;
}
