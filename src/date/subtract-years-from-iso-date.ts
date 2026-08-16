import { addYearsToISODate } from "./add-years-to-iso-date.js";

/** @example subtractYearsFromISODate(isoString, 2) // 2 years earlier */
export function subtractYearsFromISODate(isoString: string, years: number): string {
  return addYearsToISODate(isoString, -years);
}
