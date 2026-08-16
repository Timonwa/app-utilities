/**
 * The next date falling on the given weekday, on or after `from` (today by default).
 * Generalised from a hardcoded next-Friday helper — pass 5 for that.
 *
 * @param weekday - 0 = Sunday … 6 = Saturday
 * @example getNextWeekdayDate(5) // the coming Friday, or today if today is Friday
 */
export function getNextWeekdayDate(weekday: number, from: Date = new Date()): Date {
  const result = new Date(from);
  result.setDate(from.getDate() + ((weekday - from.getDay() + 7) % 7));
  return result;
}
