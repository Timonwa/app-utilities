import { addYears } from "date-fns";

/**
 * Adds calendar years to a milliseconds timestamp, clamping Feb 29 to Feb 28 in a non-leap target year.
 * @example addYearsToMillis(Date.UTC(2024, 1, 29), 1) // Date.UTC(2025, 1, 28)
 */
export function addYearsToMillis(millis: number, years: number): number {
  return addYears(new Date(millis), years).getTime();
}
