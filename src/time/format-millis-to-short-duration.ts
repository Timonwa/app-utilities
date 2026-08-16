/**
 * Formats a duration in milliseconds as a short string (e.g., `2h 30m`).
 * @param ms - Duration in milliseconds
 * @returns Short duration string
 * @example formatMillisToShortDuration(9000000) // "2h 30m"
 */
export function formatMillisToShortDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return "0m";
}
