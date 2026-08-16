import { differenceInCalendarDays } from "date-fns";

/**
 * Whole calendar days between two ISO strings, always positive.
 *
 * @example getDaysDifferenceFromISO("2024-01-15", "2024-01-20") // 5
 */
export function getDaysDifferenceFromISO(isoA: string, isoB: string): number {
  return Math.abs(differenceInCalendarDays(new Date(isoB), new Date(isoA)));
}
