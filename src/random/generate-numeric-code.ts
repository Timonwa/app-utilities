/**
 * A random numeric code — an OTP, a verification code. Crypto-random, because a numeric
 * code is almost always something a user redeems, and `Math.random` is guessable.
 *
 * @example generateNumericCode(6) // "482913"
 */
export function generateNumericCode(length: number): string {
  const digits = new Uint8Array(length);
  crypto.getRandomValues(digits);
  // 250 = 25 × 10 — rejection-sample so 250-255 don't skew toward digits 0-5.
  const code: string[] = [];
  let buffer = digits;
  let cursor = 0;
  while (code.length < length) {
    if (cursor >= buffer.length) {
      buffer = new Uint8Array(length);
      crypto.getRandomValues(buffer);
      cursor = 0;
    }
    const byte = buffer[cursor++] as number;
    if (byte < 250) code.push(String(byte % 10));
  }
  return code.join("");
}
