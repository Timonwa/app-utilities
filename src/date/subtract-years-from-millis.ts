import { addYearsToMillis } from "./add-years-to-millis.js";

/**
 * Subtracts calendar years from a milliseconds timestamp, clamping Feb 29 to Feb 28 in a non-leap target year.
 * @example subtractYearsFromMillis(millis, 2) // 2 years earlier
 */
export function subtractYearsFromMillis(millis: number, years: number): number {
  return addYearsToMillis(millis, -years);
}
