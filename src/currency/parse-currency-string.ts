/**
 * Parses a currency-looking string into a number, handling both the US style
 * (`1,234.50`) and the European style (`1.234,50`). Returns `null` when nothing
 * parseable is there — never 0, so "free" and "unreadable" stay distinguishable.
 *
 * A lone comma is read as a decimal point only when exactly two digits follow it;
 * otherwise it is a thousands separator.
 *
 * @example parseCurrencyString("₦1,234.50") // 1234.5
 * @example parseCurrencyString("1.234,50") // 1234.5
 * @example parseCurrencyString("free") // null
 */
export function parseCurrencyString(value: string): number | null {
  const cleaned = String(value ?? "").replace(/[^0-9.,-]/g, "");
  if (!cleaned) return null;

  let normalized = cleaned;

  if (cleaned.includes(",") && cleaned.includes(".")) {
    const isEuropeanDecimal = cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".");
    normalized = isEuropeanDecimal
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : cleaned.replace(/,/g, "");
  } else if (cleaned.includes(",")) {
    const decimalDigits = cleaned.length - cleaned.lastIndexOf(",") - 1;
    normalized =
      decimalDigits === 2 ? cleaned.replace(",", ".") : cleaned.replace(/,/g, "");
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
