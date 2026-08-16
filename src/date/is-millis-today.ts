import { isDateToday } from "./is-date-today.js";

/** @example isMillisToday(Date.now()) // true */
export function isMillisToday(millis: number): boolean {
  return Number.isFinite(millis) && isDateToday(new Date(millis));
}
