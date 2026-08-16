/**
 * Sets an item in sessionStorage with JSON serialization.
 * @param key - Storage key
 * @param value - Value to serialize
 * @example setSessionStorageItem("tempData", { step: 1 })
 */
export function setSessionStorageItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error);
  }
}
