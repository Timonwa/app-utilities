/**
 * Formats a duration in milliseconds as a human-readable string.
 * @param ms - Duration in milliseconds
 * @returns Human-readable duration string
 * @example formatMillisToDuration(90061000) // "1 day, 1 hour, 1 minute, 1 second"
 */
export function formatMillisToDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours % 24 > 0) parts.push(`${hours % 24} hour${hours % 24 === 1 ? "" : "s"}`);
  if (minutes % 60 > 0)
    parts.push(`${minutes % 60} minute${minutes % 60 === 1 ? "" : "s"}`);
  if (seconds % 60 > 0)
    parts.push(`${seconds % 60} second${seconds % 60 === 1 ? "" : "s"}`);

  return parts.join(", ") || "0 seconds";
}
