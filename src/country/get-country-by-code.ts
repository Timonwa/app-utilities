import type { CountryProps } from "./countries-list.js";
import { COUNTRIES_LIST } from "./countries-list.js";

/**
 * Looks a country up by its ISO 3166-1 alpha-2 code, case-insensitively.
 *
 * @example getCountryByCode("NG")?.name // "Nigeria"
 * @example getCountryByCode("ng")?.flag // "🇳🇬"
 */
export function getCountryByCode(code: string): CountryProps | undefined {
  const normalized = String(code ?? "")
    .trim()
    .toUpperCase();
  return COUNTRIES_LIST.find((country) => country.code === normalized);
}
