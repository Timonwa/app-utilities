import { isNumber } from "./is-number.js";

/**
 * Parses a string to a finite number, or `null` — never a guess. `Number("")` is 0 in
 * JavaScript, which silently turns an empty input into a valid amount; that returns
 * `null` here.
 *
 * @example parseStringToNumber("12.5") // 12.5
 * @example parseStringToNumber("") // null
 */
export function parseStringToNumber(value: string): number | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return isNumber(parsed) ? parsed : null;
}
