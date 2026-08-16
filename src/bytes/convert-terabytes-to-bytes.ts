import { BYTES_IN_KB } from "./_shared.js";

/** @example convertTerabytesToBytes(1) // 1099511627776 */
export function convertTerabytesToBytes(terabytes: number): number {
  return terabytes * BYTES_IN_KB ** 4;
}
