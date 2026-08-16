import { BYTES_IN_KB } from "./_shared.js";

/** @example convertGigabytesToBytes(1) // 1073741824 */
export function convertGigabytesToBytes(gigabytes: number): number {
  return gigabytes * BYTES_IN_KB ** 3;
}
