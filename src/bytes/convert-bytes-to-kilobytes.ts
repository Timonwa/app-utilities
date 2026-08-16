import { BYTES_IN_KB } from "./_shared.js";

/** @example convertBytesToKilobytes(2048) // 2 */
export function convertBytesToKilobytes(bytes: number): number {
  return bytes / BYTES_IN_KB;
}
