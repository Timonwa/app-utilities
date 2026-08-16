import { BYTES_IN_KB } from "./_shared.js";

/**
 * Converts bytes to kilobytes (base 1024), without rounding.
 *
 * @example convertBytesToKilobytes(2048) // 2
 */
export function convertBytesToKilobytes(bytes: number): number {
  return bytes / BYTES_IN_KB;
}
