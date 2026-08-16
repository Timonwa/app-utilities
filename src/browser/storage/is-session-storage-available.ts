/**
 * Checks whether sessionStorage is available in the current environment.
 * @returns True if usable
 * @example if (isSessionStorageAvailable()) { useSessionStorage(); }
 */
export function isSessionStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
