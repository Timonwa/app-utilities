/**
 * Milliseconds to a full ISO string — a conversion between representations, not display formatting, hence convert.
 * @param millis - Source milliseconds
 * @returns ISO 8601 string
 * @example convertMillisToISOString(1705276800000) // "2024-01-15T00:00:00.000Z"
 */
export function convertMillisToISOString(millis: number): string {
  return new Date(millis).toISOString();
}
