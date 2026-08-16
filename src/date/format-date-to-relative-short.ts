import { RELATIVE_TIME_DIVISIONS } from "./_shared.js";

const SHORT_UNIT: Record<string, string> = {
  second: "s",
  minute: "m",
  hour: "h",
  day: "d",
  week: "w",
  month: "mo",
  year: "y",
};

/**
 * Compact relative time for tight UI — "5m ago", "2h ago", "in 3d".
 *
 * @example formatDateToRelativeShort(new Date(Date.now() - 300_000)) // "5m ago"
 */
export function formatDateToRelativeShort(date: Date): string {
  let duration = (date.getTime() - Date.now()) / 1000;

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      const value = Math.round(Math.abs(duration));
      const unit = SHORT_UNIT[division.unit] ?? division.unit;
      return duration <= 0 ? `${value}${unit} ago` : `in ${value}${unit}`;
    }
    duration /= division.amount;
  }
  const value = Math.round(Math.abs(duration));
  return duration <= 0 ? `${value}y ago` : `in ${value}y`;
}
