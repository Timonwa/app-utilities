import type { CountryProps } from "./countries-list.js";
import { COUNTRIES_LIST } from "./countries-list.js";

/**
 * Looks a country up by its full name, case-insensitively and trimmed.
 *
 * @example getCountryByName("nigeria")?.code // "NG"
 */
export function getCountryByName(name: string): CountryProps | undefined {
  const normalized = String(name ?? "")
    .trim()
    .toLowerCase();
  return COUNTRIES_LIST.find((country) => country.name.toLowerCase() === normalized);
}
