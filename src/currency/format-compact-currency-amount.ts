/**
 * Formats a main-unit amount in compact notation for dashboards — "₦1.5M", "$2.3K".
 * Takes MAIN units, unlike the minor-unit formatters; a compact figure is an at-a-glance
 * number, which is main-unit territory.
 *
 * @example formatCompactCurrencyAmount(1_500_000, "NGN", { locale: "en-NG" }) // "₦1.5M"
 */
export function formatCompactCurrencyAmount(
  amount: number,
  currency: string,
  options: { locale?: string } = {},
): string {
  try {
    return new Intl.NumberFormat(options.locale, {
      style: "currency",
      currency,
      notation: "compact",
      // Left to default, ICU 76 and earlier derive the minimum from the currency's
      // digits and pad "$950" to "$950.0" — output would vary by Node version.
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    return String(amount);
  }
}
