/**
 * Gets all keys from localStorage.
 * @returns Array of keys
 * @example getLocalStorageKeys() // ["user", "settings"]
 */
export function getLocalStorageKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch {
    return [];
  }
}
