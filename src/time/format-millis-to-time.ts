/**
 * Formats a duration in milliseconds as a time string (HH:MM:SS).
 * @param ms - Duration in milliseconds
 * @returns HH:MM:SS string
 * @example formatMillisToTime(3661000) // "01:01:01"
 */
export function formatMillisToTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((v) => v.toString().padStart(2, "0")).join(":");
}
