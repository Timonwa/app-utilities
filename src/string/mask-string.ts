/**
 * Hides all but the trailing characters of a sensitive value.
 *
 * The mask length matches the input length, so the display does not leak how long
 * the real value was any more than it already does.
 *
 * @example maskString("4242424242424242") // "••••••••••••4242"
 */
export function maskString(value: string, visibleCharacters = 4): string {
  if (value.length <= visibleCharacters) return value;
  return "•".repeat(value.length - visibleCharacters) + value.slice(-visibleCharacters);
}
