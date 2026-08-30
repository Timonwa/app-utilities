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
  // Double modulo keeps negative totals wrapping backwards across midnight.
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const newHours = Math.floor(wrapped / 60);
  const newMinutes = wrapped % 60;
  return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
}
