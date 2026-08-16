/**
 * Gets the current date/time as a full ISO string.
 * @returns ISO 8601 string for now
 * @example getCurrentISOString() // "2024-01-15T10:30:00.000Z"
 */
export function getCurrentISOString(): string {
  return new Date().toISOString();
}
