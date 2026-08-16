/**
 * Shortens a string to at most `maxLength` characters, ellipsis included.
 *
 * The ellipsis counts toward the budget, so the result never exceeds what you asked
 * for — the point of a maximum is that it holds.
 *
 * @param maxLength - Total length of the result, ellipsis included
 * @example truncateString("This is a long string", 10) // "This is a…"
 */
export function truncateString(value: string, maxLength: number, ellipsis = "…"): string {
  if (!value || value.length <= maxLength) return value;
  if (maxLength <= ellipsis.length) return value.slice(0, maxLength);
  return value.slice(0, maxLength - ellipsis.length).trimEnd() + ellipsis;
}
