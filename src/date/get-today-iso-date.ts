import { toLocalIsoDate } from "./_shared.js";

/**
 * Today's LOCAL calendar date as YYYY-MM-DD — not the UTC date, which is a different
 * day for part of every timezone's evening or morning.
 *
 * @example getTodayISODate() // "2026-08-16"
 */
export function getTodayISODate(): string {
  return toLocalIsoDate(new Date());
}
