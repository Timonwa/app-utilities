# @timonwa/app-utilities

## 0.3.0

### Minor Changes

- [`4f2d247`](https://github.com/Timonwa/app-utilities/commit/4f2d2474cad2255960c93d6eeb6b46c25d3bed78) Thanks [@Timonwa](https://github.com/Timonwa)! - Add a `firestore` module — dependency-free helpers for the shapes a Firestore Timestamp actually arrives in: `parseFirestoreTimestampToDate` (any wire/SDK shape → `Date | null`), `getFirestoreTimestampSortMillis` (0-sentinel millis for sort pipelines), `convertFirestoreTimestampToDateTimeLocal` (the `datetime-local` input value), and the duck-typed `isFirestoreTimestamp` guard.
  
  Add a `crypto` module — `hashTextToSha256Hex` (Web Crypto, async, runs in Node/browser/edge) and `isTimingSafeEqual` (constant-time string comparison for tokens and signatures, no early return on length or position).

## 0.2.0

### Minor Changes

- [`d15c118`](https://github.com/Timonwa/app-utilities/commit/d15c1183d89b8d7bbb2bb2b3bac6f36d1a67854a) Thanks [@Timonwa](https://github.com/Timonwa)! - The full library: 17 modules, ~290 functions, ported from real production codebases and corrected on the way in.
  
  **Universal entry** — `array`, `bytes`, `cloudinary`, `country`, `currency`, `date` (Date ⇄ ISO ⇄ millis in one module, with a closed conversion matrix and an enforced add/subtract mirror), `error`, `form`, `number`, `random`, `string`, `time`, `url`, `validation`.
  
  **`/browser` entry** — `clipboard`, `image`, `storage`.
  
  Highlights over typical hand-rolled versions: calendar arithmetic clamps (Jan 31 + 1 month is Feb 28/29), YYYY-MM-DD output is the local date rather than UTC-shifted, per-currency minor-unit digits come from Intl (JPY-safe), case conversion keeps digits attached to their word, `parse*` returns `null` instead of guessing, crypto randomness for redeemable codes, and every validator returns one `{ valid, message? }` shape. One dependency: `date-fns`, for the four things worth a dependency.
