import { isDateToday } from "./is-date-today.js";

/** @example isISODateToday(new Date().toISOString()) // true */
export function isISODateToday(isoString: string): boolean {
  const date = new Date(isoString);
  return !Number.isNaN(date.getTime()) && isDateToday(date);
}
