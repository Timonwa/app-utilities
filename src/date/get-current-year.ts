/**
 * The current full year, evaluated when called — never cache it in a module-level
 * constant, which goes stale in any process that crosses New Year.
 *
 * @example getCurrentYear() // 2026
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
