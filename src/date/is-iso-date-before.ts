/**
 * Checks whether one ISO date string is strictly before another.
 * @param isoA - First ISO date string
 * @param isoB - Second ISO date string
 * @returns True if isoA < isoB
 * @example isISODateBefore("2024-01-15", "2024-01-16") // true
 */
export function isISODateBefore(isoA: string, isoB: string): boolean {
  return new Date(isoA) < new Date(isoB);
}
