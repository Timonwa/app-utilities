/**
 * Removes an item from sessionStorage.
 * @param key - Storage key
 * @example removeSessionStorageItem("tempData")
 */
export function removeSessionStorageItem(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing sessionStorage key "${key}":`, error);
  }
}
