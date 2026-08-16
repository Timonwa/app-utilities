/**
 * Removes an item from localStorage.
 * @param key - Storage key
 * @example removeLocalStorageItem("user")
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}
