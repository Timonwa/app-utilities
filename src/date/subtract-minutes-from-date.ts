import { addMinutesToDate } from "./add-minutes-to-date.js";

/** @example subtractMinutesFromDate(date, 2) // 2 minutes earlier */
export function subtractMinutesFromDate(date: Date, minutes: number): Date {
  return addMinutesToDate(date, -minutes);
}
