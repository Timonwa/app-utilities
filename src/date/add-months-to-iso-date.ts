import { addMonths } from "date-fns";

/**
 * Adds calendar months to an ISO string, with the same last-day clamping as
 * `addMonthsToDate` — Jan 31 + 1 month is the end of February, never March 2.
 *
 * @example addMonthsToISODate("2024-01-31T00:00:00.000Z", 1) // "2024-02-29T00:00:00.000Z"
 */
export function addMonthsToISODate(isoString: string, months: number): string {
  return addMonths(new Date(isoString), months).toISOString();
}
