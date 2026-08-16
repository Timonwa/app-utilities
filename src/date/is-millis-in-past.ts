/**
 * Checks whether a milliseconds timestamp is in the past.
 * @param millis - Source milliseconds
 * @returns True if before now
 * @example isMillisInPast(1705276800000) // true
 */
export function isMillisInPast(millis: number): boolean {
  return millis < Date.now();
}
