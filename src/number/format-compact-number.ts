/**
 * Compact notation for dashboards — "1.5M", "82K" — via Intl, so it localizes ("150万"
 * under ja-JP) instead of hand-picking English suffixes.
 *
 * @example formatCompactNumber(1_500_000) // "1.5M"
 */
export function formatCompactNumber(value: number, locale?: string): string {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
