/**
 * Converts a 12-hour time to 24-hour components.
 * @param hours - Hours (1-12)
 * @param minutes - Minutes (0-59)
 * @param period - "AM" or "PM"
 * @returns Object with 24-hour `hours` and `minutes`
 * @example convertTimeTo24Hour(2, 30, "PM") // { hours: 14, minutes: 30 }
 */
export function convertTimeTo24Hour(
  hours: number,
  minutes: number,
  period: "AM" | "PM",
): { hours: number; minutes: number } {
  let hours24 = hours;
  if (period === "AM" && hours === 12) {
    hours24 = 0;
  } else if (period === "PM" && hours !== 12) {
    hours24 = hours + 12;
  }
  return { hours: hours24, minutes };
}
