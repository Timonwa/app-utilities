import { parseISO } from "date-fns";

/**
 * Converts an ISO string to a Date object via date-fns `parseISO`.
 * @param isoString - ISO 8601 string
 * @returns Date
 * @example convertISOStringToDate("2024-01-15T10:30:00.000Z") // Date
 */
export function convertISOStringToDate(isoString: string): Date {
  return parseISO(isoString);
}
