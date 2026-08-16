import { BYTES_IN_KB } from "./_shared.js";

/** @example convertMegabytesToBytes(1) // 1048576 */
export function convertMegabytesToBytes(megabytes: number): number {
  return megabytes * BYTES_IN_KB ** 2;
}
