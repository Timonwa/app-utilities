/**
 * Extracts the time portion from an ISO string.
 * @param isoString - ISO 8601 string
 * @returns Time portion string
 * @example extractTimeFromISOString("2024-01-15T10:30:00.000Z") // "10:30:00.000Z"
 */
export function extractTimeFromISOString(isoString: string): string {
  return isoString.split("T")[1] || "";
}
