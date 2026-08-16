import { addDaysToMillis } from "./add-days-to-millis.js";

/**
 * Subtracts days from a milliseconds timestamp.
 * @example subtractDaysFromMillis(millis, 5) // 5 × 24h earlier
 */
export function subtractDaysFromMillis(millis: number, days: number): number {
  return addDaysToMillis(millis, -days);
}
