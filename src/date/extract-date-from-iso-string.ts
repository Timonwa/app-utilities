/**
 * Extracts the date portion (YYYY-MM-DD) from an ISO string.
 * @param isoString - ISO 8601 string
 * @returns YYYY-MM-DD string
 * @example extractDateFromISOString("2024-01-15T10:30:00.000Z") // "2024-01-15"
 */
export function extractDateFromISOString(isoString: string): string {
  return isoString.split("T")[0] || "";
}
