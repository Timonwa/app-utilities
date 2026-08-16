/** @example addMinutesToDate(new Date("2024-01-15T10:00:00"), 30) // 2024-01-15T10:30:00 */
export function addMinutesToDate(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}
