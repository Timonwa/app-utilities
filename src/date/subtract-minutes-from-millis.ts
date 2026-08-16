import { addMinutesToMillis } from "./add-minutes-to-millis.js";

/** @example subtractMinutesFromMillis(millis, 2) // 2 minutes earlier */
export function subtractMinutesFromMillis(millis: number, minutes: number): number {
  return addMinutesToMillis(millis, -minutes);
}
