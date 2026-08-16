/**
 * Counts the whitespace-separated words in a string, returning 0 for empty or blank input.
 *
 * @example countWordsInString("hello world") // 2
 */
export function countWordsInString(value: string): number {
  const trimmed = value?.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
