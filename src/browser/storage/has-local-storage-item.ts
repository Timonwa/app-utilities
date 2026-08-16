/**
 * Checks whether a key exists in localStorage.
 * @param key - Storage key
 * @returns True if present
 * @example hasLocalStorageItem("user") // true
 */
export function hasLocalStorageItem(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}
