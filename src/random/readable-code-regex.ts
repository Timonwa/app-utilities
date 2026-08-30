/**
 * Matches the default readable-code format `generateReadableCode` produces: two 4-char
 * groups of uppercase letters + digits (ambiguous I, L, O, 0, 1 excluded), dash-separated.
 *
 * J-K and M-N are spelled out so the class can't silently re-admit L via a J-N range.
 *
 * @example READABLE_CODE_REGEX.test("K3F7-9TXM") // true
 */
export const READABLE_CODE_REGEX = /^[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}$/;
