import { addMonthsToMillis } from "./add-months-to-millis.js";

/** @example subtractMonthsFromMillis(millis, 2) // 2 months earlier */
export function subtractMonthsFromMillis(millis: number, months: number): number {
  return addMonthsToMillis(millis, -months);
}
