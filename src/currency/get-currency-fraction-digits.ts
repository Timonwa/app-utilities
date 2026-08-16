/**
 * How many minor-unit digits a currency has — 2 for NGN and USD, 0 for JPY, 3 for KWD.
 * Resolved from Intl, so there is no metadata map to maintain; an unknown code falls
 * back to 2, the most common case.
 *
 * @example getCurrencyFractionDigits("NGN") // 2
 * @example getCurrencyFractionDigits("JPY") // 0
 */
export function getCurrencyFractionDigits(currency: string): number {
  try {
    return (
      new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions()
        .maximumFractionDigits ?? 2
    );
  } catch {
    return 2;
  }
}
