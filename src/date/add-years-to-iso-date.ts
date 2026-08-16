import { addYears } from "date-fns";

/** @example addYearsToISODate("2024-02-29T00:00:00.000Z", 1) // "2025-02-28T00:00:00.000Z" */
export function addYearsToISODate(isoString: string, years: number): string {
  return addYears(new Date(isoString), years).toISOString();
}
