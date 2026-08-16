/**
 * Approximate sessionStorage footprint in bytes (UTF-16 uses 2 bytes per character).
 *
 * @example getSessionStorageSize() // 1024
 */
export function getSessionStorageSize(): number {
  try {
    let totalSize = 0;
    for (const key of Object.keys(sessionStorage)) {
      const value = sessionStorage.getItem(key);
      if (value) totalSize += key.length + value.length;
    }
    return totalSize * 2;
  } catch {
    return 0;
  }
}
