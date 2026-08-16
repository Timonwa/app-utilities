const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 * Formats an ISO string to an ordinal date (e.g., `22nd Jun, 2023`).
 * @param isoString - ISO date string
 * @returns Ordinal date string
 * @example formatISOToOrdinalDate("2023-06-22") // "22nd Jun, 2023"
 */
export function formatISOToOrdinalDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}${daySuffix} ${month}, ${year}`;
}
