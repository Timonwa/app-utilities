import { BYTES_IN_KB } from "./_shared.js";

/** @example convertBytesToMegabytes(1048576) // 1 */
export function convertBytesToMegabytes(bytes: number): number {
  return bytes / BYTES_IN_KB ** 2;
}
