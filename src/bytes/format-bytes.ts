import type { ByteUnit } from "./_shared.js";
import { BYTES_IN_KB, UNIT_MULTIPLIERS } from "./_shared.js";

/**
 * Picks the largest unit the value fits into and formats it for display.
 *
 * @param decimals - Digits after the point, default 2
 * @example formatBytes(1572864) // "1.50 MB"
 * @example formatBytes(1572864, 0) // "2 MB"
 */
export function formatBytes(bytes: number, decimals = 2): string {
  const units = Object.keys(UNIT_MULTIPLIERS) as ByteUnit[];

  // Guard first: log(0) is -Infinity, and a negative size is not a size.
  if (!Number.isFinite(bytes) || bytes <= 0) return `${(0).toFixed(decimals)} B`;

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KB)),
    units.length - 1,
  );

  return `${(bytes / BYTES_IN_KB ** exponent).toFixed(decimals)} ${units[exponent]}`;
}
