import { parseTimeString } from "./parse-time-string.js";

/**
 * Adds minutes to a time string.
 * @param timeString - HH:MM string
 * @param minutesToAdd - Minutes to add (negative subtracts)
 * @returns New HH:MM string
 * @example addMinutesToTime("14:30", 45) // "15:15"
 */
export function addMinutesToTime(timeString: string, minutesToAdd: number): string {
  const time = parseTimeString(timeString);
  const totalMinutes = time.hours * 60 + time.minutes + minutesToAdd;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
}
