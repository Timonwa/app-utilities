// A Map-backed Storage stand-in — enough surface for these helpers, no DOM dependency.
// Proxied so stored keys surface as own enumerable props, the way the keys/size
// helpers enumerate a real Storage via Object.keys.
function createStorageMock(): Storage {
  const map = new Map<string, string>();
  const api = {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => map.get(k) ?? null,
    key: (i: number) => [...map.keys()][i] ?? null,
    removeItem: (k: string) => void map.delete(k),
    setItem: (k: string, v: string) => void map.set(k, String(v)),
  };
  return new Proxy(api, {
    get: (target, prop) =>
      prop in target ? target[prop as keyof typeof target] : map.get(prop as string),
    ownKeys: () => [...map.keys()],
    getOwnPropertyDescriptor: (_target, prop) =>
      map.has(prop as string)
        ? { enumerable: true, configurable: true, value: map.get(prop as string) }
        : undefined,
  }) as Storage;
}

export function installStorageMocks(): void {
  const local = createStorageMock();
  const session = createStorageMock();
  Object.defineProperty(globalThis, "localStorage", { value: local, configurable: true });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: session,
    configurable: true,
  });
}

// Simulates a locked-down browser where merely touching the storage global throws.
export function installThrowingStorageMocks(): void {
  const deny = () => {
    throw new Error("Storage disabled");
  };
  Object.defineProperty(globalThis, "localStorage", { get: deny, configurable: true });
  Object.defineProperty(globalThis, "sessionStorage", { get: deny, configurable: true });
}
