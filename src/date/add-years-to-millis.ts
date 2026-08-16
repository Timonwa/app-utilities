import { addYears } from "date-fns";

/** @example addYearsToMillis(Date.UTC(2024, 1, 29), 1) // Date.UTC(2025, 1, 28) */
export function addYearsToMillis(millis: number, years: number): number {
  return addYears(new Date(millis), years).getTime();
}
