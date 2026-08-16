import type { CountryProps } from "./countries-list.js";
import { COUNTRIES_LIST } from "./countries-list.js";

/**
 * All countries whose name contains the query, case-insensitively — for filtering a
 * country picker as the user types. An empty query returns everything, so an untouched
 * search box shows the full list.
 *
 * @example searchCountriesByName("guinea").length // 4
 */
export function searchCountriesByName(query: string): CountryProps[] {
  const normalized = String(query ?? "")
    .trim()
    .toLowerCase();
  if (!normalized) return [...COUNTRIES_LIST];
  return COUNTRIES_LIST.filter((country) =>
    country.name.toLowerCase().includes(normalized),
  );
}
