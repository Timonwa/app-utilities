import { toArrayCopy } from "./_shared.js";

/**
 * Fisher-Yates shuffle on a copy.
 *
 * Uses `Math.random()`, so it is fine for presentation and NOT fine for anything
 * security-relevant — a shuffled deck in a real game, a random token, a draw.
 *
 * @example getShuffledArray([1, 2, 3, 4]) // [3, 1, 4, 2]
 */
export function getShuffledArray<T>(array: T[]): T[] {
  const shuffled = toArrayCopy(array);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
  }
  return shuffled;
}
