/**
 * Generates a human-readable code (uppercase + digits, ambiguous chars excluded)
 * grouped with a separator — suitable for share-with-attendee codes like album
 * passcodes. Uses `crypto.getRandomValues` so codes are cryptographically random.
 * @param length - Total number of chars (excluding separators)
 * @param groupSize - Chars per group; pass `0` or `>= length` to skip grouping
 * @param separator - String inserted between groups
 * @returns Grouped readable code string
 * @example generateReadableCode() // "K3F7-9TXM"
 */
export function generateReadableCode(
  length: number = 8,
  groupSize: number = 4,
  separator: string = "-",
): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  // Rejection-sample to keep the distribution uniform across the 31-char
  // alphabet. Bytes ≥ floor(256 / 31) * 31 would skew toward the first
  // (256 mod 31) chars, so we discard and refill from a fresh buffer.
  const acceptMax = Math.floor(256 / alphabet.length) * alphabet.length;
  const chars: string[] = [];
  let buf = new Uint8Array(length);
  crypto.getRandomValues(buf);
  let cursor = 0;
  while (chars.length < length) {
    if (cursor >= buf.length) {
      buf = new Uint8Array(length);
      crypto.getRandomValues(buf);
      cursor = 0;
    }
    const b = buf[cursor++]!;
    if (b < acceptMax) chars.push(alphabet[b % alphabet.length]!);
  }
  if (groupSize <= 0 || groupSize >= length) return chars.join("");
  const groups: string[] = [];
  for (let i = 0; i < length; i += groupSize) {
    groups.push(chars.slice(i, i + groupSize).join(""));
  }
  return groups.join(separator);
}
