import { getCurrencyFractionDigits } from "./get-currency-fraction-digits.js";

/**
 * Formats an amount held in minor units (kobo, cents) as a localized currency string.
 * The divisor comes from the currency itself, so JPY (no minor unit) and KWD (three
 * digits) format correctly, not just two-decimal currencies.
 *
 * Storing money in minor units and formatting at the edge is the pattern this exists
 * for; if you hold main units already, use Intl directly or `formatCompactCurrencyAmount`.
 *
 * @example formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" }) // "₦1,234.50"
 * @example formatCurrencyFromMinorUnit(500, "JPY", { locale: "ja-JP" }) // "￥500"
 */
export function formatCurrencyFromMinorUnit(
  minorUnitAmount: number | bigint,
  currency: string,
  options: { locale?: string } = {},
): string {
  try {
    const divisor = 10 ** getCurrencyFractionDigits(currency);
    return new Intl.NumberFormat(options.locale, {
      style: "currency",
      currency,
    }).format(Number(minorUnitAmount) / divisor);
  } catch {
    return String(minorUnitAmount);
  }
}
