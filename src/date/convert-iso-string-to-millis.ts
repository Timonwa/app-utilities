/**
 * ISO string to Unix milliseconds — the missing corner of the Date ⇄ ISO ⇄ millis
 * conversion matrix. Returns `null` for an unparseable string rather than `NaN`, which
 * silently poisons every arithmetic that touches it.
 *
 * @example convertISOStringToMillis("1970-01-01T00:00:01.000Z") // 1000
 */
export function convertISOStringToMillis(isoString: string): number | null {
  const millis = new Date(isoString).getTime();
  return Number.isNaN(millis) ? null : millis;
}
