/**
 * Rounds a number to N decimal places.
 * @param num - Number to round
 * @param decimals - Decimal places
 * @returns Rounded number
 * @example roundNumberToDecimal(123.456, 2) // 123.46
 */
export function roundNumberToDecimal(num: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}
