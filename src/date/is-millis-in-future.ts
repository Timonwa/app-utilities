/**
 * Checks whether a milliseconds timestamp is in the future.
 * @param millis - Source milliseconds
 * @returns True if after now
 * @example isMillisInFuture(1893456000000) // true
 */
export function isMillisInFuture(millis: number): boolean {
  return millis > Date.now();
}
