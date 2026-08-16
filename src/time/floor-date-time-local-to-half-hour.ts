/**
 * Floors a `YYYY-MM-DDTHH:mm` string to the preceding half-hour (`:00` or `:30`).
 *
 * @example floorDateTimeLocalToHalfHour("2026-09-23T10:42") // "2026-09-23T10:30"
 */
export function floorDateTimeLocalToHalfHour(value: string): string {
  if (!value) return "";
  const minute = Number(value.slice(14, 16));
  return `${value.slice(0, 14)}${minute < 30 ? "00" : "30"}`;
}
