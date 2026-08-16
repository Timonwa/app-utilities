import { BYTES_IN_KB } from "./_shared.js";

/**
 * Converts bytes to megabytes (base 1024), without rounding.
 *
 * @example convertBytesToMegabytes(1048576) // 1
 */
export function convertBytesToMegabytes(bytes: number): number {
  return bytes / BYTES_IN_KB ** 2;
}
