/**
 * The current full year, evaluated when called — the old module-load constant went
 * stale in any process that crossed New Year.
 *
 * @example getCurrentYear() // 2026
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
