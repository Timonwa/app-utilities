import { BYTES_IN_KB } from "./_shared.js";

/**
 * Converts megabytes to gigabytes (base 1024), without rounding.
 *
 * @example convertMegabytesToGigabytes(1536) // 1.5
 */
export function convertMegabytesToGigabytes(megabytes: number): number {
  return megabytes / BYTES_IN_KB;
}
