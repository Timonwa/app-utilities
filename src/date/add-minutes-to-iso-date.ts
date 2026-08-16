/** @example addMinutesToISODate("2024-01-15T10:00:00.000Z", 30) // "2024-01-15T10:30:00.000Z" */
export function addMinutesToISODate(isoString: string, minutes: number): string {
  const date = new Date(isoString);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}
