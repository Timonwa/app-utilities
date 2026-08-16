import { addMonthsToMillis } from "./add-months-to-millis.js";

/**
 * Subtracts calendar months from a milliseconds timestamp, clamping to the last day when the target month is shorter.
 * @example subtractMonthsFromMillis(millis, 2) // 2 months earlier
 */
export function subtractMonthsFromMillis(millis: number, months: number): number {
  return addMonthsToMillis(millis, -months);
}
