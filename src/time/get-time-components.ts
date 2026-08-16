/**
 * Gets hours, minutes, and seconds from a Date.
 * @param date - Source Date
 * @returns Components object
 * @example getTimeComponents(new Date("2024-01-15T15:30:45")) // { hours: 15, minutes: 30, seconds: 45 }
 */
export function getTimeComponents(date: Date): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}
