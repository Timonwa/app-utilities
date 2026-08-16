import { addHoursToISODate } from "./add-hours-to-iso-date.js";

/** @example subtractHoursFromISODate(isoString, 2) // 2 hours earlier */
export function subtractHoursFromISODate(isoString: string, hours: number): string {
  return addHoursToISODate(isoString, -hours);
}
