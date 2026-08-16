import { BYTES_IN_KB } from "./_shared.js";

/**
 * Converts gigabytes to megabytes (base 1024), without rounding.
 *
 * @example convertGigabytesToMegabytes(1.5) // 1536
 */
export function convertGigabytesToMegabytes(gigabytes: number): number {
  return gigabytes * BYTES_IN_KB;
}
