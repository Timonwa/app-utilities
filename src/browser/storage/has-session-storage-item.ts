/**
 * Checks whether a key exists in sessionStorage.
 * @param key - Storage key
 * @returns True if present
 * @example hasSessionStorageItem("tempData") // true
 */
export function hasSessionStorageItem(key: string): boolean {
  try {
    return sessionStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}
