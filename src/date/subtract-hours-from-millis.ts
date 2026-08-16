import { addHoursToMillis } from "./add-hours-to-millis.js";

/**
 * Subtracts hours from a milliseconds timestamp.
 * @example subtractHoursFromMillis(millis, 2) // 2 hours earlier
 */
export function subtractHoursFromMillis(millis: number, hours: number): number {
  return addHoursToMillis(millis, -hours);
}
