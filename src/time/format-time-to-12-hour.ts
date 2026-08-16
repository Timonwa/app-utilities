import { convertTimeTo12Hour } from "./convert-time-to-12-hour.js";

/**
 * Formats an HH:MM time string in 12-hour format with AM/PM.
 * @param time - HH:MM string
 * @returns 12-hour formatted string, or `""` for invalid input
 * @example formatTimeTo12Hour("14:30") // "2:30 PM"
 */
export function formatTimeTo12Hour(time: string): string {
  if (!time || typeof time !== "string") return "";

  const parts = time.split(":").map(Number);
  const hour = parts[0];
  const minute = parts[1];

  if (hour === undefined || minute === undefined) return "";
  return convertTimeTo12Hour(hour, minute);
}
