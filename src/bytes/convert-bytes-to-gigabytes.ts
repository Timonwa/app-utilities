import { BYTES_IN_KB } from "./_shared.js";

/**
 * Converts bytes to gigabytes (base 1024), without rounding.
 *
 * @example convertBytesToGigabytes(1073741824) // 1
 */
export function convertBytesToGigabytes(bytes: number): number {
  return bytes / BYTES_IN_KB ** 3;
}
