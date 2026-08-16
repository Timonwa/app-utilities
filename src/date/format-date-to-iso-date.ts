import { toLocalIsoDate } from "./_shared.js";

/**
 * The LOCAL calendar date as YYYY-MM-DD. Deliberately not `toISOString().slice(0, 10)`,
 * which converts to UTC first and returns yesterday's date near midnight in any
 * UTC-positive timezone.
 *
 * @example formatDateToIsoDate(new Date(2024, 0, 15)) // "2024-01-15"
 */
export function formatDateToIsoDate(date: Date): string {
  return toLocalIsoDate(date);
}
