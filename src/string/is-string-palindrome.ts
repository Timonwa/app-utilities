import { stripToAlphanumeric } from "./strip-to-alphanumeric.js";

/**
 * Whether a string reads the same both ways, ignoring case and anything that is not a
 * letter or digit — so "A man, a plan, a canal: Panama" qualifies.
 *
 * @example isStringPalindrome("racecar") // true
 * @example isStringPalindrome("hello") // false
 */
export function isStringPalindrome(value: string): boolean {
  const cleaned = stripToAlphanumeric(value);
  return cleaned === [...cleaned].reverse().join("");
}
