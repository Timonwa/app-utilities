import type { CountryProps } from "./countries-list.js";
import { COUNTRIES_LIST } from "./countries-list.js";

/**
 * Looks a country up by its international dial code, with or without the `+`.
 *
 * Shared dial codes exist — `+1` alone is the US, Canada, and most of the Caribbean —
 * and this returns the first match in alphabetical order, so prefer the ISO code as the
 * identifier and treat the dial code as display data.
 *
 * @example getCountryByDialCode("+234")?.code // "NG"
 * @example getCountryByDialCode("234")?.code // "NG"
 */
export function getCountryByDialCode(dialCode: string): CountryProps | undefined {
  const raw = String(dialCode ?? "").trim();
  const normalized = raw.startsWith("+") ? raw : `+${raw}`;
  return COUNTRIES_LIST.find((country) => country.dialCode === normalized);
}
