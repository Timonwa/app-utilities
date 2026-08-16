/**
 * Checks whether localStorage is available in the current environment.
 * @returns True if usable
 * @example if (isLocalStorageAvailable()) { useLocalStorage(); }
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
