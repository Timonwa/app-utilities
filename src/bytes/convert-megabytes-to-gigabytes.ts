import { BYTES_IN_KB } from "./_shared.js";

/** @example convertMegabytesToGigabytes(1536) // 1.5 */
export function convertMegabytesToGigabytes(megabytes: number): number {
  return megabytes / BYTES_IN_KB;
}
