import { BYTES_IN_KB } from "./_shared.js";

/** @example convertBytesToTerabytes(1099511627776) // 1 */
export function convertBytesToTerabytes(bytes: number): number {
  return bytes / BYTES_IN_KB ** 4;
}
