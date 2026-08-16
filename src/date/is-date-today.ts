/**
 * Checks whether a date falls on today's calendar day.
 * @param date - Date to check
 * @returns True if date is today
 * @example isDateToday(new Date()) // true
 */
export function isDateToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
