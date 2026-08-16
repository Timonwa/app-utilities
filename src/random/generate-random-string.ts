const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * A random alphanumeric string. `Math.random`-based — fine for keys, filenames, and
 * display ids, NOT for secrets or codes a user redeems; use `generateReadableCode`
 * (crypto-random) for those.
 *
 * @example generateRandomString(8) // "aB3dE9fG"
 */
export function generateRandomString(length = 8): string {
  return Array.from({ length }, () =>
    ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length)),
  ).join("");
}
