import {
  MILLIS_PER_DAY,
  MILLIS_PER_HOUR,
  MILLIS_PER_MINUTE,
  MILLIS_PER_SECOND,
} from "./millis-constants.js";

/**
 * Gets the absolute difference between two milliseconds timestamps in the requested unit.
 * @param startMillis - Start milliseconds
 * @param endMillis - End milliseconds
 * @param unit - Output unit
 * @returns Difference in the requested unit
 * @example getMillisDifference(start, end, "days") // 5
 */
export function getMillisDifference(
  startMillis: number,
  endMillis: number,
  unit: "milliseconds" | "seconds" | "minutes" | "hours" | "days" = "milliseconds",
): number {
  const diff = Math.abs(endMillis - startMillis);
  switch (unit) {
    case "seconds":
      return Math.floor(diff / MILLIS_PER_SECOND);
    case "minutes":
      return Math.floor(diff / MILLIS_PER_MINUTE);
    case "hours":
      return Math.floor(diff / MILLIS_PER_HOUR);
    case "days":
      return Math.floor(diff / MILLIS_PER_DAY);
    default:
      return diff;
  }
}
