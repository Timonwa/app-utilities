/** Unit ladder for relative-time formatting — each row is how many of this unit fit in
 *  the next. Walked until the remaining amount fits, so the largest sensible unit wins. */
export const RELATIVE_TIME_DIVISIONS: ReadonlyArray<{
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}> = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

/** YYYY-MM-DD from LOCAL calendar components. Going through `toISOString()` converts to
 *  UTC first, which shifts the date near midnight — in Lagos at 00:30, "today" via UTC
 *  is yesterday. */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
