import { parseTimeString } from "./parse-time-string.js";

/**
 * Gets the difference (in ms) between two HH:MM or HH:MM:SS time strings.
 * @param startTime - Start HH:MM or HH:MM:SS
 * @param endTime - End HH:MM or HH:MM:SS
 * @returns Difference in milliseconds (signed)
 * @example getTimeDifferenceInMillis("14:00", "16:30") // 9000000
 */
export function getTimeDifferenceInMillis(startTime: string, endTime: string): number {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);

  const startMs = (start.hours * 3600 + start.minutes * 60 + start.seconds) * 1000;
  const endMs = (end.hours * 3600 + end.minutes * 60 + end.seconds) * 1000;

  return endMs - startMs;
}
