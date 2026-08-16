/**
 * Formats a duration in seconds as HH:MM:SS or MM:SS.
 * @param totalSeconds - Duration in seconds
 * @param includeHours - When true, always render the hours segment
 * @returns Time string
 * @example formatSecondsToTime(3661) // "01:01:01"
 */
export function formatSecondsToTime(
  totalSeconds: number,
  includeHours: boolean = true,
): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (includeHours || hours > 0) {
    return [hours, minutes, seconds].map((v) => v.toString().padStart(2, "0")).join(":");
  }
  return [minutes, seconds].map((v) => v.toString().padStart(2, "0")).join(":");
}
