import { toLocalIsoDate } from "./_shared.js";

/**
 * The LOCAL calendar date of a millis timestamp as YYYY-MM-DD — same local-not-UTC rule
 * as `formatDateToIsoDate`.
 *
 * @example formatMillisToIsoDate(new Date(2024, 0, 15).getTime()) // "2024-01-15"
 */
export function formatMillisToIsoDate(millis: number): string {
  return toLocalIsoDate(new Date(millis));
}
