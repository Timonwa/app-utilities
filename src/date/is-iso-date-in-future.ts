/**
 * Checks whether an ISO date string is in the future.
 * @param isoString - ISO date string
 * @returns True if after now
 * @example isISODateInFuture("2030-01-15T00:00:00.000Z") // true
 */
export function isISODateInFuture(isoString: string): boolean {
  return new Date(isoString) > new Date();
}
