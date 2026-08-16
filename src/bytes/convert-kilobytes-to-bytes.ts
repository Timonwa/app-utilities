import { BYTES_IN_KB } from "./_shared.js";

/** @example convertKilobytesToBytes(2) // 2048 */
export function convertKilobytesToBytes(kilobytes: number): number {
  return kilobytes * BYTES_IN_KB;
}
