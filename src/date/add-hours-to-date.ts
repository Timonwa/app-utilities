/**
 * Adds hours to a Date.
 * @example addHoursToDate(new Date("2024-01-15T10:00:00"), 3) // 2024-01-15T13:00:00
 */
export function addHoursToDate(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}
