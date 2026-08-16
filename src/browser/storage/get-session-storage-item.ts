/**
 * Gets an item from sessionStorage with JSON parsing.
 * @param key - Storage key
 * @param defaultValue - Value to return if missing or unparseable
 * @returns Parsed value, or default
 * @example getSessionStorageItem<TempData>("tempData") // { step: 1 }
 */
export function getSessionStorageItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error getting sessionStorage key "${key}":`, error);
    return defaultValue;
  }
}
