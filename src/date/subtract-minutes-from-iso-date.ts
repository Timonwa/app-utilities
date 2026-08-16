import { addMinutesToISODate } from "./add-minutes-to-iso-date.js";

/** @example subtractMinutesFromISODate(isoString, 2) // 2 minutes earlier */
export function subtractMinutesFromISODate(isoString: string, minutes: number): string {
  return addMinutesToISODate(isoString, -minutes);
}
