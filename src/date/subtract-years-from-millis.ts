import { addYearsToMillis } from "./add-years-to-millis.js";

/** @example subtractYearsFromMillis(millis, 2) // 2 years earlier */
export function subtractYearsFromMillis(millis: number, years: number): number {
  return addYearsToMillis(millis, -years);
}
