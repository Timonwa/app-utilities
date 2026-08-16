/** @example addHoursToISODate("2024-01-15T10:00:00.000Z", 3) // "2024-01-15T13:00:00.000Z" */
export function addHoursToISODate(isoString: string, hours: number): string {
  const date = new Date(isoString);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}
