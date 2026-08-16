/**
 * Sets an item in localStorage with JSON serialization.
 * @param key - Storage key
 * @param value - Value to serialize
 * @example setLocalStorageItem("user", { id: 1, name: "John" })
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}
