import type { ByteUnit } from "./_shared.js";
import { UNIT_MULTIPLIERS } from "./_shared.js";

/**
 * Parses a human-written size back into bytes. Returns `null` rather than a guess when
 * the string isn't a size, so a caller can tell "0 bytes" apart from "unparseable".
 *
 * @example parseSizeToBytes("1.5 MB") // 1572864
 * @example parseSizeToBytes("500kb") // 512000
 * @example parseSizeToBytes("about 2 gigs") // null
 */
export function parseSizeToBytes(size: string): number | null {
  const match = String(size)
    .trim()
    .match(/^([\d.]+)\s*(B|KB|MB|GB|TB|PB)$/i);
  if (!match) return null;

  const value = Number.parseFloat(match[1] ?? "");
  if (!Number.isFinite(value)) return null;

  const unit = (match[2] ?? "B").toUpperCase() as ByteUnit;
  return Math.round(value * UNIT_MULTIPLIERS[unit]);
}
