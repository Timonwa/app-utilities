import { addMonths } from "date-fns";

/**
 * Adds calendar months to a millis timestamp — the operation behind "one month from
 * now" on a subscription. Calendar-aware with last-day clamping, unlike day/hour
 * arithmetic on millis, which is fixed-duration by design.
 *
 * @example addMonthsToMillis(Date.UTC(2024, 0, 31), 1) // Date.UTC(2024, 1, 29)
 */
export function addMonthsToMillis(millis: number, months: number): number {
  return addMonths(new Date(millis), months).getTime();
}
