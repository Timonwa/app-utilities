import type { StorageItemWithExpiry } from "./_shared.js";
import { getSessionStorageItem } from "./get-session-storage-item.js";
import { removeSessionStorageItem } from "./remove-session-storage-item.js";

/** Expired entries are evicted on access. @example getSessionStorageItemWithExpiry<string>("draft") */
export function getSessionStorageItemWithExpiry<T>(key: string): T | undefined {
  const item = getSessionStorageItem<StorageItemWithExpiry<T>>(key);
  if (!item) return undefined;
  if (Date.now() > item.expiry) {
    removeSessionStorageItem(key);
    return undefined;
  }
  return item.value;
}
