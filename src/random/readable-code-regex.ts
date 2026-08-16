/**
 * Matches the default readable-code format `generateReadableCode` produces: two 4-char
 * groups of uppercase letters + digits (ambiguous I, L, O, 0, 1 excluded), dash-separated.
 *
 * @example READABLE_CODE_REGEX.test("K3F7-9TXM") // true
 */
export const READABLE_CODE_REGEX = /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;
