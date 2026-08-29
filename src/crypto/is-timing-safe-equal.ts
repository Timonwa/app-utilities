/**
 * Constant-time string comparison for secrets — tokens, signatures, codes.
 * A plain `===` returns early on the first differing character, leaking how
 * many leading characters matched. This XOR-folds every byte so the time
 * taken never depends on where the difference is; length is folded in too
 * rather than early-returned. No crypto API involved, so it runs anywhere.
 *
 * @example isTimingSafeEqual(providedToken, expectedToken) // true only on exact match
 */
export function isTimingSafeEqual(a: string, b: string): boolean {
  const bytesA = new TextEncoder().encode(a);
  const bytesB = new TextEncoder().encode(b);
  const length = Math.max(bytesA.length, bytesB.length);
  let mismatch = bytesA.length ^ bytesB.length;
  for (let i = 0; i < length; i += 1) {
    mismatch |= (bytesA[i] ?? 0) ^ (bytesB[i] ?? 0);
  }
  return mismatch === 0;
}
