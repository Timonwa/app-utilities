import { RELATIVE_TIME_DIVISIONS } from "./_shared.js";

/**
 * Relative time via `Intl.RelativeTimeFormat` — "2 hours ago", "in 3 days",
 * "yesterday". Localized by the runtime, no library and no hand-kept English strings.
 *
 * @example formatDateToRelative(new Date(Date.now() - 3_600_000)) // "1 hour ago"
 */
export function formatDateToRelative(date: Date, locale?: string): string {
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  let duration = (date.getTime() - Date.now()) / 1000;

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return formatter.format(Math.round(duration), "year");
}
