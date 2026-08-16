/**
 * Checks whether an ISO date string is in the past.
 * @param isoString - ISO date string
 * @returns True if before now
 * @example isISODateInPast("2020-01-15T00:00:00.000Z") // true
 */
export function isISODateInPast(isoString: string): boolean {
  return new Date(isoString) < new Date();
}
