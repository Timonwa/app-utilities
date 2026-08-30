# @timonwa/app-utilities

## 0.4.2

### Patch Changes

- [#5](https://github.com/Timonwa/app-utilities/pull/5) [`f28b63a`](https://github.com/Timonwa/app-utilities/commit/f28b63a61bc55677783c7660a1b5cb22a21d81d6) Thanks [@Timonwa](https://github.com/Timonwa)! - `formatCompactCurrencyAmount` now formats whole amounts identically on every supported Node version. The minimum fraction digits were left to the engine, and ICU 76 and earlier derive them from the currency's own digits — so `formatCompactCurrencyAmount(950, "USD")` produced `"$950.0"` on Node 22 but `"$950"` on Node 26.

## 0.4.1

### Patch Changes

- [`fd36d0e`](https://github.com/Timonwa/app-utilities/commit/fd36d0efded50289c4f1b0e42655e328a31e73ae) Thanks [@Timonwa](https://github.com/Timonwa)! - Fix six utilities that mishandled edge inputs:
  
  - `maskString(value, 0)` returned the mask followed by the full value — it now hides everything.
  - `isValidISODate` accepted impossible dates such as `"2024-02-31"`, which V8 rolls into the next month.
  - `addMinutesToTime` produced `"-1:-15"` instead of wrapping backwards across midnight.
  - `formatTimeTo12Hour` returned `"12:NaN AM"` for non-numeric segments instead of the documented `""`.
  - `extractSocialUsername` returned `"in"` for LinkedIn profile URLs.
  - `READABLE_CODE_REGEX` matched the letter `L`, which the readable-code alphabet excludes as ambiguous.

## 0.4.0

### Minor Changes

- [`600f168`](https://github.com/Timonwa/app-utilities/commit/600f1686a278103e679c2dc3598c3dadc5548802) Thanks [@Timonwa](https://github.com/Timonwa)! - Complete the `firestore` module to the full house matrix — guards for serialized wire shapes and parser inputs, exact converters to Date/millis/ISO, serialized-shape creators (fixtures and payloads without the SDK), the full fallback-safe format family (iso/readable/readable-date-time/short/relative/relative-short/ordinal/time), and `compareFirestoreTimestamps` plus in-future/in-past/today checks. Date arithmetic stays in the `date` module — parse to a Date, do the math there, and write the Date back (Firestore accepts it natively).

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
