/**
 * How much of a quota is used, as a whole percentage. A limit of zero or less reads as
 * 0% rather than dividing by it, because "no quota" is not "completely full".
 *
 * @example getStoragePercent(512, 1024) // 50
 */
export function getStoragePercent(used: number, limit: number): number {
  if (!Number.isFinite(used) || !Number.isFinite(limit) || limit <= 0) return 0;
  return Math.round((used / limit) * 100);
}
