/**
 * Checks whether a string is a valid HH:MM or HH:MM:SS time.
 * @param timeString - String to check
 * @returns True if valid
 * @example isValidTimeString("25:00") // false
 */
export function isValidTimeString(timeString: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
  return timeRegex.test(timeString);
}
