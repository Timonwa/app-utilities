/**
 * Parses an HH:MM or HH:MM:SS string into numeric components.
 * @param timeString - HH:MM or HH:MM:SS
 * @returns Components object (missing fields default to 0)
 * @example parseTimeString("14:30") // { hours: 14, minutes: 30, seconds: 0 }
 */
export function parseTimeString(timeString: string): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const parts = timeString.split(":").map(Number);
  return {
    hours: parts[0] || 0,
    minutes: parts[1] || 0,
    seconds: parts[2] || 0,
  };
}
