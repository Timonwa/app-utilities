/**
 * Gets the approximate size of localStorage in bytes (UTF-16 estimate).
 * @returns Bytes consumed
 * @example getLocalStorageSize() // 1024
 */
export function getLocalStorageSize(): number {
  try {
    let totalSize = 0;
    for (const key in localStorage) {
      if (Object.hasOwn(localStorage, key)) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      }
    }
    return totalSize * 2;
  } catch {
    return 0;
  }
}
