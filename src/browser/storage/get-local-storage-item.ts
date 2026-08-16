/**
 * Gets an item from localStorage with JSON parsing.
 * @param key - Storage key
 * @param defaultValue - Value to return if missing or unparseable
 * @returns Parsed value, or default
 * @example getLocalStorageItem<User>("user") // { id: 1, name: "John" }
 */
export function getLocalStorageItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
}
