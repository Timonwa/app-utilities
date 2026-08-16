/**
 * Converts a 24-hour time to a 12-hour string with AM/PM.
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59)
 * @returns 12-hour string
 * @example convertTimeTo12Hour(14, 30) // "2:30 PM"
 */
export function convertTimeTo12Hour(hours: number, minutes: number): string {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${period}`;
}
