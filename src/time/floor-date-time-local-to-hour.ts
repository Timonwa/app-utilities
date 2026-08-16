/**
 * Floors a `YYYY-MM-DDTHH:mm` string — the format `<input type="datetime-local">`
 * produces — to the top of its hour. For schedulers that only fire on the hour.
 *
 * @example floorDateTimeLocalToHour("2026-09-23T10:42") // "2026-09-23T10:00"
 */
export function floorDateTimeLocalToHour(value: string): string {
  if (!value) return "";
  return `${value.slice(0, 13)}:00`;
}
