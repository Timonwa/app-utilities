/**
 * The symbol a currency renders with — resolved from Intl, not a hand-kept map. The
 * locale matters: "USD" is "$" in en-US but "US$" in en-NG, which is Intl being right,
 * not wrong.
 *
 * @example getCurrencySymbol("NGN") // "₦"
 * @example getCurrencySymbol("USD", "en-US") // "$"
 */
export function getCurrencySymbol(currency: string, locale?: string): string {
  try {
    return (
      new Intl.NumberFormat(locale, { style: "currency", currency })
        .formatToParts(1)
        .find((part) => part.type === "currency")?.value ?? ""
    );
  } catch {
    return "";
  }
}
