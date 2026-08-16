import type { StorageItemWithExpiry } from "./_shared.js";
import { getLocalStorageItem } from "./get-local-storage-item.js";
import { removeLocalStorageItem } from "./remove-local-storage-item.js";

/**
 * Gets an item from localStorage, returning undefined if expired.
 * Expired entries are evicted on access.
 * @param key - Storage key
 * @returns Stored value, or undefined when missing/expired
 * @example getLocalStorageItemWithExpiry<string>("token") // "abc123"
 */
export function getLocalStorageItemWithExpiry<T>(key: string): T | undefined {
  const item = getLocalStorageItem<StorageItemWithExpiry<T>>(key);

  if (!item) return undefined;

  if (Date.now() > item.expiry) {
    removeLocalStorageItem(key);
    return undefined;
  }

  return item.value;
}
