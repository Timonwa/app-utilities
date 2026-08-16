/**
 * Checks whether one ISO date string is strictly after another.
 * @param isoA - First ISO date string
 * @param isoB - Second ISO date string
 * @returns True if isoA > isoB
 * @example isISODateAfter("2024-01-16", "2024-01-15") // true
 */
export function isISODateAfter(isoA: string, isoB: string): boolean {
  return new Date(isoA) > new Date(isoB);
}
