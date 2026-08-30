export const MILLIS = 1_705_276_800_000; // 2024-01-15T00:00:00.000Z
export const SECONDS = MILLIS / 1000;

export function makeTimestampLike(seconds: number, nanoseconds = 0) {
  return {
    seconds,
    nanoseconds,
    toDate: () => new Date(seconds * 1000 + Math.floor(nanoseconds / 1_000_000)),
    toMillis: () => seconds * 1000 + Math.floor(nanoseconds / 1_000_000),
  };
}
