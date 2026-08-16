import { toArrayView } from "./_shared.js";

/**
 * Splits into chunks of at most `size`. A size that is zero, negative, or not finite
 * falls back to one chunk holding everything, rather than looping forever.
 *
 * @example getArrayChunks([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function getArrayChunks<T>(array: T[], size: number): T[][] {
  const source = toArrayView(array);
  if (source.length === 0) return [];

  const chunkSize = Number.isFinite(size) && size >= 1 ? Math.floor(size) : source.length;

  const chunks: T[][] = [];
  for (let index = 0; index < source.length; index += chunkSize) {
    chunks.push(source.slice(index, index + chunkSize));
  }
  return chunks;
}
