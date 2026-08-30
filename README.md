# @timonwa/app-utilities

Typed helper functions for building apps — formatting, dates, strings, files, and validation. Universal by default, with browser-only APIs behind a separate entry point, and one dependency (`date-fns`, for the calendar arithmetic no one should hand-roll).

[![npm](https://img.shields.io/npm/v/@timonwa/app-utilities)](https://www.npmjs.com/package/@timonwa/app-utilities)
[![CI](https://github.com/Timonwa/app-utilities/actions/workflows/ci.yml/badge.svg)](https://github.com/Timonwa/app-utilities/actions/workflows/ci.yml)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-timonwa-FFDD00?logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/timonwa)

Written in TypeScript; ships ESM and CJS with type declarations, is side-effect free so bundlers drop what you don't import, and every export carries the JSDoc you'll see in your editor.

## Quickstart

```bash
npm install @timonwa/app-utilities
# or: pnpm add @timonwa/app-utilities · yarn add @timonwa/app-utilities
```

```ts
import { formatBytes, formatDateToRelative, truncateString } from "@timonwa/app-utilities";

formatBytes(1_572_864); // "1.50 MB"
formatDateToRelative(new Date(Date.now() - 7_200_000)); // "2 hours ago"
truncateString("This is a long string", 10); // "This is a…"
```

Requires Node 20+, and a bundler or TypeScript using modern module resolution (`bundler`, `node16`, or `nodenext`). The pre-TS-4.7 `node` mode isn't supported — subpath exports can't work under it.

## Two entry points

The root export runs anywhere — Next.js on the server or the client, React Native, Node, a worker. Nothing in it touches `window`, `document`, `navigator`, or `localStorage`.

Anything that needs a browser API lives behind `/browser`, so importing it is a deliberate act rather than a runtime surprise:

```ts
import { copyTextToClipboard, setLocalStorageItem } from "@timonwa/app-utilities/browser";
```

That split exists for server rendering as much as for React Native — `localStorage` is undefined during SSR, and an import line is a better place to catch that than a production stack trace. Every browser function still guards for its API being absent, so a stray import degrades instead of throwing.

<!-- api:start -->

## API reference

Generated from the source JSDoc — CI fails when it drifts, so what you read here is what the code does.

Jump to: [array](#array) · [bytes](#bytes) · [cloudinary](#cloudinary) · [country](#country) · [crypto](#crypto) · [currency](#currency) · [date](#date) · [error](#error) · [firestore](#firestore) · [form](#form) · [number](#number) · [random](#random) · [string](#string) · [time](#time) · [url](#url) · [validation](#validation) · [browser/clipboard](#browserclipboard) · [browser/image](#browserimage) · [browser/storage](#browserstorage)

### Universal — `@timonwa/app-utilities`

#### `array`

```ts
const upcoming = getArraySortedByKey(events, "startDate");
const visible = getArrayItemsBySearchTerm(upcoming, query, ["name", "venue"]);
const chunks = getArrayChunks(visible, 20); // page-sized slices
```

<details>
<summary>All 18 exports</summary>

- **`getArrayChunks(array, size)`** — Splits into chunks of at most `size`. `getArrayChunks([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]`
- **`getArrayDifference(array, exclude)`** — Returns the items of the first array that are not present in the second. `getArrayDifference([1, 2, 3], [2, 4]) // [1, 3]`
- **`getArrayIntersection(first, second)`** — Values present in both arrays — completes the set trio with `getArrayDifference` and `getArrayUnion`. `getArrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]`
- **`getArrayItemAtIndex(array, index)`** — Returns the item at the given index, supporting negative indexes, or undefined when out of range. `getArrayItemAtIndex([10, 20, 30], -1) // 30`
- **`getArrayItemById(array, id)`** — Finds the first item whose `id` matches, or undefined when none does. `getArrayItemById([{ id: 1 }, { id: 2 }], 2) // { id: 2 }`
- **`getArrayItemsByKeyValue(array, key, value)`** — Returns all items whose given key strictly equals the given value. `getArrayItemsByKeyValue([{ role: "admin" }, { role: "user" }], "role", "admin") // [{ role: "admin" }]`
- **`getArrayItemsBySearchTerm(array, searchTerm, fields)`** — Case-insensitive "contains" across the given fields. `getArrayItemsBySearchTerm([{ name: "Alice" }], "ali", ["name"]) // [{ name: "Alice" }]`
- **`getArraySortedByKey(array, key, order = "asc")`** — Sorts by one key. `getArraySortedByKey([{ age: 30 }, { age: 20 }], "age") // [{ age: 20 }, { age: 30 }]`
- **`getArrayUnion(first, second)`** — Merges two arrays into one with duplicates removed, keeping first-seen order. `getArrayUnion([1, 2], [2, 3]) // [1, 2, 3]`
- **`getArrayWithoutDuplicates(array)`** — Removes duplicate values, keeping the first occurrence of each. `getArrayWithoutDuplicates([1, 2, 2, 3]) // [1, 2, 3]`
- **`getFirstArrayItem(array)`** — Returns the first item of the array, or undefined when it is empty. `getFirstArrayItem([1, 2, 3]) // 1`
- **`getFlattenedArray(array)`** — Flattens one level, dropping anything that is not an array. `getFlattenedArray([[1, 2], [3, 4]]) // [1, 2, 3, 4]`
- **`getLastArrayItem(array)`** — Returns the last item of the array, or undefined when it is empty. `getLastArrayItem([1, 2, 3]) // 3`
- **`getShuffledArray(array)`** — Fisher-Yates shuffle on a copy. `getShuffledArray([1, 2, 3, 4]) // [3, 1, 4, 2]`
- **`groupArrayByConsecutiveKey(array, getKey)`** — Groups runs of adjacent items sharing a key, preserving order. `groupArrayByConsecutiveKey([{c:"a"},{c:"a"},{c:"b"}], (x) => x.c)`
- **`hasArrayItem(array, value)`** — Checks whether the array contains the given value. `hasArrayItem([1, 2, 3], 2) // true`
- **`isArrayEmpty(array)`** — Checks whether the array has no items. `isArrayEmpty([]) // true`
- **`rankByTiers(tiers)`** — Builds a comparator-friendly rank from an ordered list of predicates — the index of the first one that matches, or `tiers.length` for no match.

</details>

#### `bytes`

```ts
formatBytes(file.size); // "4.20 MB"
const limit = parseSizeToBytes("50 MB"); // 52428800
getUsageLevel(getStoragePercent(used, quota)); // "high" -> map to your own colors
```

<details>
<summary>All 14 exports</summary>

- **`convertBytesToGigabytes(bytes)`** — Converts bytes to gigabytes (base 1024), without rounding. `convertBytesToGigabytes(1073741824) // 1`
- **`convertBytesToKilobytes(bytes)`** — Converts bytes to kilobytes (base 1024), without rounding. `convertBytesToKilobytes(2048) // 2`
- **`convertBytesToMegabytes(bytes)`** — Converts bytes to megabytes (base 1024), without rounding. `convertBytesToMegabytes(1048576) // 1`
- **`convertBytesToTerabytes(bytes)`** — Converts bytes to terabytes (base 1024), without rounding. `convertBytesToTerabytes(1099511627776) // 1`
- **`convertGigabytesToBytes(gigabytes)`** — Converts gigabytes to bytes (base 1024), without rounding. `convertGigabytesToBytes(1) // 1073741824`
- **`convertGigabytesToMegabytes(gigabytes)`** — Converts gigabytes to megabytes (base 1024), without rounding. `convertGigabytesToMegabytes(1.5) // 1536`
- **`convertKilobytesToBytes(kilobytes)`** — Converts kilobytes to bytes (base 1024), without rounding. `convertKilobytesToBytes(2) // 2048`
- **`convertMegabytesToBytes(megabytes)`** — Converts megabytes to bytes (base 1024), without rounding. `convertMegabytesToBytes(1) // 1048576`
- **`convertMegabytesToGigabytes(megabytes)`** — Converts megabytes to gigabytes (base 1024), without rounding. `convertMegabytesToGigabytes(1536) // 1.5`
- **`convertTerabytesToBytes(terabytes)`** — Converts terabytes to bytes (base 1024), without rounding. `convertTerabytesToBytes(1) // 1099511627776`
- **`formatBytes(bytes, decimals = 2)`** — Picks the largest unit the value fits into and formats it for display. `formatBytes(1572864) // "1.50 MB"`
- **`getStoragePercent(used, limit)`** — How much of a quota is used, as a whole percentage. `getStoragePercent(512, 1024) // 50`
- **`getUsageLevel(percent, thresholds)`** — Buckets a usage percentage into a band, so the caller maps the band to its own colours. `getUsageLevel(95) // "critical"`
- **`parseSizeToBytes(size)`** — Parses a human-written size back into bytes. `parseSizeToBytes("1.5 MB") // 1572864`

</details>

#### `cloudinary`

```ts
const url = buildCloudinaryUrl({ cloudName, publicId, transform: "w_800,q_auto,f_auto" });
<img src={buildCloudinaryResizedUrl(url, 768)} srcSet={buildCloudinarySrcset(url)} />
```

<details>
<summary>All 12 exports</summary>

- **`HOST`** — See source.
- **`SAMPLE_UPLOAD_URL`** — See source.
- **`applyCloudinaryTransform(url, transform)`** — Inserts a transform into an existing Cloudinary URL, chaining ahead of any transforms already there.
- **`buildCloudinaryBlurUrl(url)`** — A tiny, heavily blurred version for use as a placeholder behind the real image while it loads. `buildCloudinaryBlurUrl(url) // ".../upload/w_40,e_blur:1000,q_auto:low,f_auto/..."`
- **`buildCloudinaryPublicId(segments)`** — Joins path segments into a Cloudinary `public_id`, dropping empties and replacing the characters Cloudinary treats specially in a URL. `buildCloudinaryPublicId(["events", eventId, photoId]) // "events/ev_1/ph_2"`
- **`buildCloudinaryResizedUrl(url, width)`** — The image at a given width. `buildCloudinaryResizedUrl(url, 768) // ".../upload/w_768,c_limit,q_auto,f_auto,dpr_auto/..."`
- **`buildCloudinarySrcset(url, widths = DEFAULT_RESPONSIVE_WIDTHS)`** — A `srcset` value covering the given widths. `buildCloudinarySrcset(url) // ".../w_480/... 480w, .../w_768/... 768w, …"`
- **`buildCloudinaryUrlVariants(options)`** — Builds one URL per named transform, so a caller derives a whole set of variants from a single public id in one call.
- **`buildCloudinaryUrl(options)`** — Builds a delivery URL from its parts.
- **`DEFAULT_RESPONSIVE_WIDTHS`** — The widths a responsive image ladder covers by default — roughly phone, tablet, laptop, desktop, and large desktop at 1x.
- **`extractPublicIdFromCloudinaryUrl(url)`** — Recovers the `public_id` from a delivery URL — the inverse of `buildCloudinaryUrl`.
- **`isCloudinaryUrl(url)`** — Checks whether a URL is served from the Cloudinary delivery host (res.cloudinary.com). `isCloudinaryUrl("https://res.cloudinary.com/demo/image/upload/a.jpg") // true`

Types: `CloudinaryAssetType`, `BuildCloudinaryUrlOptions`

</details>

#### `country`

```ts
getCountryByCode("NG")?.flag; // "🇳🇬"
searchCountriesByName(query); // filter a country picker as the user types
```

<details>
<summary>All 5 exports</summary>

- **`COUNTRIES_LIST`** — All 250 countries and territories, sorted by name — the name, flag emoji, ISO 3166-1 alpha-2 code, and international dial code of each.
- **`getCountryByCode(code)`** — Looks a country up by its ISO 3166-1 alpha-2 code, case-insensitively. `getCountryByCode("NG")?.name // "Nigeria"`
- **`getCountryByDialCode(dialCode)`** — Looks a country up by its international dial code, with or without the `+`. `getCountryByDialCode("+234")?.code // "NG"`
- **`getCountryByName(name)`** — Looks a country up by its full name, case-insensitively and trimmed. `getCountryByName("nigeria")?.code // "NG"`
- **`searchCountriesByName(query)`** — All countries whose name contains the query, case-insensitively — for filtering a country picker as the user types. `searchCountriesByName("guinea").length // 4`

Types: `CountryProps`, `CountryCode`

</details>

#### `crypto`

```ts
if (!isTimingSafeEqual(providedToken, expectedToken)) return notFound(); // no timing leak
const checksum = await hashTextToSha256Hex(payload); // node, browser, and edge
```

<details>
<summary>All 2 exports</summary>

- **`hashTextToSha256Hex(text)`** — SHA-256 of a UTF-8 string as lowercase hex. `await hashTextToSha256Hex("hello") // "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"`
- **`isTimingSafeEqual(a, b)`** — Constant-time string comparison for secrets — tokens, signatures, codes. `isTimingSafeEqual(providedToken, expectedToken) // true only on exact match`

</details>

#### `currency`

```ts
formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" }); // "₦1,234.50"
const amount = parseCurrencyString(input); // number | null — "free" is not 0
```

<details>
<summary>All 17 exports</summary>

- **`convertCurrencyAmount(amount, exchangeRate)`** — Multiplies an amount by an exchange rate. `convertCurrencyAmount(100, 1.5) // 150`
- **`convertCurrencyToMainUnit(amount, currency)`** — Minor units to main units — kobo to naira, cents to dollars. `convertCurrencyToMainUnit(1250) // 12.5`
- **`convertCurrencyToSmallestUnit(amount, currency)`** — Main units to minor units — naira to kobo, dollars to cents — rounded to a whole number, because a minor unit is by definition indivisible. `convertCurrencyToSmallestUnit(12.5) // 1250`
- **`formatCompactCurrencyAmount(amount, currency, options)`** — Formats a main-unit amount in compact notation for dashboards — "₦1.5M", "$2.3K". `formatCompactCurrencyAmount(1_500_000, "NGN", { locale: "en-NG" }) // "₦1.5M"`
- **`formatCurrencyAmountWithoutSymbol(amount, locale)`** — Locale-aware thousands separators and fixed decimals, no symbol — for an input field or a table column whose header already names the currency. `formatCurrencyAmountWithoutSymbol(1234.5, "en-US") // "1,234.50"`
- **`formatCurrencyFromMinorUnit(minorUnitAmount, currency, options)`** — Formats an amount held in minor units (kobo, cents) as a localized currency string. `formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" }) // "₦1,234.50"`
- **`formatCurrencyMapFromMinorUnits(values, options)`** — Formats a currency-code → minor-unit-amount map as display strings, sorted by descending amount — for a stat card showing revenue across currencies. `formatCurrencyMapFromMinorUnits({ NGN: 12_000_000, USD: 4500 })`
- **`getCurrencyAmountAfterDiscount(originalPrice, discountPercentage)`** — What remains after a percentage discount. `getCurrencyAmountAfterDiscount(100, 20) // 80`
- **`getCurrencyAmountWithTax(price, taxRate)`** — A price with tax added. `getCurrencyAmountWithTax(100, 7.5) // 107.5`
- **`getCurrencyDiscountAmount(originalPrice, discountPercentage)`** — The discount portion of a price, given a percentage. `getCurrencyDiscountAmount(100, 20) // 20`
- **`getCurrencyFractionDigits(currency)`** — How many minor-unit digits a currency has — 2 for NGN and USD, 0 for JPY, 3 for KWD. `getCurrencyFractionDigits("NGN") // 2`
- **`getCurrencySymbol(currency, locale)`** — The symbol a currency renders with — resolved from Intl, not a hand-kept map. `getCurrencySymbol("NGN") // "₦"`
- **`getCurrencyTaxAmount(price, taxRate)`** — The tax portion of a price, given a rate. `getCurrencyTaxAmount(100, 7.5) // 7.5`
- **`getRoundedCurrencyAmount(amount, fractionDigits = 2)`** — Rounds a main-unit amount to a currency-sensible number of decimals — the half-up rounding a customer expects on a receipt. `getRoundedCurrencyAmount(12.3456) // 12.35`
- **`isValidCurrencyAmount(amount)`** — Whether a value is a finite, non-negative number — the minimum bar for an amount of money a form should accept. `isValidCurrencyAmount(-1) // false`
- **`isValidCurrencyString(value)`** — Whether a string parses to a valid non-negative amount. `isValidCurrencyString("₦1,200.50") // true`
- **`parseCurrencyString(value)`** — Parses a currency-looking string into a number, handling both the US style (`1,234.50`) and the European style (`1.234,50`). `parseCurrencyString("₦1,234.50") // 1234.5`

</details>

#### `date`

```ts
formatDateToRelative(post.createdAt); // "2 hours ago"
const due = addMonthsToDate(new Date(), 1); // clamps: Jan 31 + 1mo = Feb 28/29
getTodayISODate(); // local calendar date, never UTC-shifted
```

<details>
<summary>All 98 exports</summary>

- **`addDaysToDate(date, days)`** — Adds days to a date. `addDaysToDate(new Date("2024-01-01"), 5) // Date for 2024-01-06`
- **`addDaysToISODate(isoString, days)`** — Adds days to an ISO date string and returns a new ISO string. `addDaysToISODate("2024-01-15T00:00:00.000Z", 5) // "2024-01-20T00:00:00.000Z"`
- **`addDaysToMillis(millis, days)`** — Adds days to a milliseconds timestamp. `addDaysToMillis(1705276800000, 5) // 5 days later in millis`
- **`addHoursToDate(date, hours)`** — Adds hours to a Date. `addHoursToDate(new Date("2024-01-15T10:00:00"), 3) // 2024-01-15T13:00:00`
- **`addHoursToISODate(isoString, hours)`** — Adds hours to an ISO date string and returns a new ISO string. `addHoursToISODate("2024-01-15T10:00:00.000Z", 3) // "2024-01-15T13:00:00.000Z"`
- **`addHoursToMillis(millis, hours)`** — Adds hours to a milliseconds timestamp. `addHoursToMillis(1705276800000, 3) // 3 hours later in millis`
- **`addMinutesToDate(date, minutes)`** — Adds minutes to a Date. `addMinutesToDate(new Date("2024-01-15T10:00:00"), 30) // 2024-01-15T10:30:00`
- **`addMinutesToISODate(isoString, minutes)`** — Adds minutes to an ISO date string and returns a new ISO string. `addMinutesToISODate("2024-01-15T10:00:00.000Z", 30) // "2024-01-15T10:30:00.000Z"`
- **`addMinutesToMillis(millis, minutes)`** — Adds minutes to a milliseconds timestamp. `addMinutesToMillis(1705276800000, 30) // 30 minutes later in millis`
- **`addMonthsToDate(date, months)`** — Adds months, clamping to the last day when the target month is shorter — Jan 31 + 1 month is Feb 29/28, not Mar 2/3 the way a raw `setMonth` overflows. `addMonthsToDate(new Date("2024-01-31"), 1) // Date for 2024-02-29`
- **`addMonthsToISODate(isoString, months)`** — Adds calendar months to an ISO string, with the same last-day clamping as `addMonthsToDate` — Jan 31 + 1 month is the end of February, never March 2. `addMonthsToISODate("2024-01-31T00:00:00.000Z", 1) // "2024-02-29T00:00:00.000Z"`
- **`addMonthsToMillis(millis, months)`** — Adds calendar months to a millis timestamp — the operation behind "one month from now" on a subscription. `addMonthsToMillis(Date.UTC(2024, 0, 31), 1) // Date.UTC(2024, 1, 29)`
- **`addYearsToDate(date, years)`** — Adds years, clamping Feb 29 to Feb 28 in a non-leap target year rather than overflowing to Mar 1. `addYearsToDate(new Date("2024-02-29"), 1) // Date for 2025-02-28`
- **`addYearsToISODate(isoString, years)`** — Adds calendar years to an ISO date string and returns a new ISO string, clamping Feb 29 to Feb 28 in a non-leap target year. `addYearsToISODate("2024-02-29T00:00:00.000Z", 1) // "2025-02-28T00:00:00.000Z"`
- **`addYearsToMillis(millis, years)`** — Adds calendar years to a milliseconds timestamp, clamping Feb 29 to Feb 28 in a non-leap target year. `addYearsToMillis(Date.UTC(2024, 1, 29), 1) // Date.UTC(2025, 1, 28)`
- **`compareDates(dateA, dateB)`** — Comparator for sorting Dates — `dates.sort(compareDates)` ascends. `[b, a].sort(compareDates) // [a, b] when a is earlier`
- **`compareISODates(isoA, isoB)`** — Compares two ISO date strings. `compareISODates("2024-01-15", "2024-01-16") // -1`
- **`convertDateToISOString(date)`** — Converts a Date object to a full ISO 8601 string. `convertDateToISOString(new Date()) // "2024-01-15T10:30:00.000Z"`
- **`convertDateToMillis(date)`** — Converts a Date to milliseconds since epoch. `convertDateToMillis(new Date("2024-01-15")) // 1705276800000`
- **`convertISOStringToDate(isoString)`** — Converts an ISO string to a Date object via date-fns `parseISO`. `convertISOStringToDate("2024-01-15T10:30:00.000Z") // Date`
- **`convertISOStringToMillis(isoString)`** — ISO string to Unix milliseconds — the missing corner of the Date ⇄ ISO ⇄ millis conversion matrix. `convertISOStringToMillis("1970-01-01T00:00:01.000Z") // 1000`
- **`convertMillisToDate(millis)`** — Converts milliseconds to a Date object. `convertMillisToDate(1705276800000) // Date for 2024-01-15`
- **`convertMillisToISOString(millis)`** — Milliseconds to a full ISO string — a conversion between representations, not display formatting, hence convert. `convertMillisToISOString(1705276800000) // "2024-01-15T00:00:00.000Z"`
- **`createDateFromComponents(year, month, day)`** — Creates a Date from year, month (1-indexed), and day. `createDateFromComponents(2024, 1, 15) // Date for January 15, 2024`
- **`extractDateFromISOString(isoString)`** — Extracts the date portion (YYYY-MM-DD) from an ISO string. `extractDateFromISOString("2024-01-15T10:30:00.000Z") // "2024-01-15"`
- **`extractTimeFromISOString(isoString)`** — Extracts the time portion from an ISO string. `extractTimeFromISOString("2024-01-15T10:30:00.000Z") // "10:30:00.000Z"`
- **`formatDateToIsoDate(date)`** — The LOCAL calendar date as YYYY-MM-DD. `formatDateToIsoDate(new Date(2024, 0, 15)) // "2024-01-15"`
- **`formatDateToReadableDateTime(date, locale)`** — A localized long date with the time — "January 15, 2024, 3:30 PM". `formatDateToReadableDateTime(new Date(2024, 0, 15, 15, 30)) // "January 15, 2024 at 3:30 PM"`
- **`formatDateToReadableDate(date, locale, options)`** — A localized long date — "January 15, 2024". `formatDateToReadableDate(new Date(2024, 0, 15)) // "January 15, 2024"`
- **`formatDateToRelativeShort(date)`** — Compact relative time for tight UI — "5m ago", "2h ago", "in 3d". `formatDateToRelativeShort(new Date(Date.now() - 300_000)) // "5m ago"`
- **`formatDateToRelative(date, locale)`** — Relative time via `Intl.RelativeTimeFormat` — "2 hours ago", "in 3 days", "yesterday". `formatDateToRelative(new Date(Date.now() - 3_600_000)) // "1 hour ago"`
- **`formatDateToShortDate(date, locale)`** — A localized numeric date — "1/15/24" in en-US, "15/01/24" in en-GB. `formatDateToShortDate(new Date(2024, 0, 15), "en-US") // "1/15/24"`
- **`formatISOToOrdinalDate(isoString)`** — Formats an ISO string to an ordinal date (e.g., `22nd Jun, 2023`). `formatISOToOrdinalDate("2023-06-22") // "22nd Jun, 2023"`
- **`formatISOToReadableDateTime(isoString, locale = "en-US")`** — Formats an ISO string to a readable date and time. `formatISOToReadableDateTime("2024-01-15T10:30:00.000Z") // "January 15, 2024, 10:30 AM"`
- **`formatISOToReadableDate(isoString, locale = "en-US", options)`** — Formats an ISO string to a readable date. `formatISOToReadableDate("2024-01-15T10:30:00.000Z") // "January 15, 2024"`
- **`formatISOToRelativeShort(isoString)`** — Formats an ISO date string as a short relative time like "5m ago", returning an empty string for invalid input. `formatISOToRelativeShort(new Date(Date.now() - 300_000).toISOString()) // "5m ago"`
- **`formatISOToRelative(isoString, locale)`** — Relative time from an ISO string — one implementation for the whole package, so the Date and ISO versions can never drift apart. `formatISOToRelative(new Date(Date.now() - 7_200_000).toISOString()) // "2 hours ago"`
- **`formatISOToShortDate(isoString, locale = "en-US")`** — Formats an ISO string to a short date. `formatISOToShortDate("2024-01-15T10:30:00.000Z") // "1/15/24"`
- **`formatMillisToIsoDate(millis)`** — The LOCAL calendar date of a millis timestamp as YYYY-MM-DD — same local-not-UTC rule as `formatDateToIsoDate`. `formatMillisToIsoDate(new Date(2024, 0, 15).getTime()) // "2024-01-15"`
- **`formatMillisToReadableDateTime(millis, locale = "en-US")`** — Formats milliseconds as a readable date and time string. `formatMillisToReadableDateTime(1705276800000) // "January 15, 2024, 12:00 AM"`
- **`formatMillisToReadableDate(millis, locale = "en-US", options)`** — Formats milliseconds as a readable date string. `formatMillisToReadableDate(1705276800000) // "January 15, 2024"`
- **`formatMillisToRelativeShort(millis)`** — Formats a milliseconds timestamp as a short relative time like "5m ago", returning an empty string for non-finite input. `formatMillisToRelativeShort(Date.now() - 300_000) // "5m ago"`
- **`formatMillisToRelative(millis, locale)`** — Formats a milliseconds timestamp as a relative time like "2 hours ago", returning an empty string for non-finite input. `formatMillisToRelative(Date.now() - 7_200_000) // "2 hours ago"`
- **`formatMillisToShortDate(millis, locale)`** — Formats a milliseconds timestamp as a locale-aware short date like "1/15/24". `formatMillisToShortDate(new Date(2024, 0, 15).getTime(), "en-US") // "1/15/24"`
- **`getCurrentDate()`** — Now, as a Date — completes the trio with `getCurrentISOString` and `getCurrentMillis`, so code written against this package stays in one vocabulary. `getCurrentDate() // Date for now`
- **`getCurrentISOString()`** — Gets the current date/time as a full ISO string. `getCurrentISOString() // "2024-01-15T10:30:00.000Z"`
- **`getCurrentMillis()`** — Gets the current time in milliseconds. `getCurrentMillis() // 1705276800000`
- **`getCurrentYear()`** — The current full year, evaluated when called — never cache it in a module-level constant, which goes stale in any process that crosses New Year. `getCurrentYear() // 2026`
- **`getDaysBetweenDates(dateA, dateB)`** — Whole calendar days between two dates, always positive. `getDaysBetweenDates(new Date("2024-01-01"), new Date("2024-01-15")) // 14`
- **`getDaysDifferenceFromISO(isoA, isoB)`** — Whole calendar days between two ISO strings, always positive. `getDaysDifferenceFromISO("2024-01-15", "2024-01-20") // 5`
- **`getEndOfDayMillis(millis)`** — Gets the end of day (23:59:59.999) for a milliseconds timestamp. `getEndOfDayMillis(1705300000000) // End-of-day millis`
- **`getEndOfDay(date)`** — Returns the end of the given day (23:59:59.999). `getEndOfDay(new Date("2024-01-15T15:30:00")) // 2024-01-15T23:59:59.999`
- **`getEndOfMonthMillis(millis)`** — Returns the milliseconds timestamp of the last instant of the month containing the given timestamp, in local time. `getEndOfMonthMillis(new Date(2024, 0, 15).getTime()) // millis of Jan 31 23:59:59.999`
- **`getEndOfMonth(date)`** — Returns the end of the given month (last day at 23:59:59.999). `getEndOfMonth(new Date("2024-01-15")) // 2024-01-31T23:59:59.999`
- **`getEndOfTodayMillis()`** — Gets the end of today in milliseconds. `getEndOfTodayMillis() // End-of-today millis`
- **`getMillisDifference(startMillis, endMillis, unit = "milliseconds")`** — Gets the absolute difference between two milliseconds timestamps in the requested unit. `getMillisDifference(start, end, "days") // 5`
- **`getNextWeekdayDate(weekday, from = new Date())`** — The next date falling on the given weekday, on or after `from` (today by default). `getNextWeekdayDate(5) // the coming Friday, or today if today is Friday`
- **`getStartOfDayMillis(millis)`** — Gets the start of day (00:00:00.000) for a milliseconds timestamp. `getStartOfDayMillis(1705300000000) // Start-of-day millis`
- **`getStartOfDay(date)`** — Returns the start of the given day (00:00:00.000). `getStartOfDay(new Date("2024-01-15T15:30:00")) // 2024-01-15T00:00:00.000`
- **`getStartOfMonthMillis(millis)`** — Returns the milliseconds timestamp of the first instant of the month containing the given timestamp, in local time. `getStartOfMonthMillis(new Date(2024, 0, 15).getTime()) // millis of Jan 1 00:00:00.000`
- **`getStartOfMonth(date)`** — Returns the start of the given month (first day at 00:00:00.000). `getStartOfMonth(new Date("2024-01-15")) // 2024-01-01T00:00:00.000`
- **`getStartOfTodayMillis()`** — Gets the start of today in milliseconds. `getStartOfTodayMillis() // Start-of-today millis`
- **`getTodayISODate()`** — Today's LOCAL calendar date as YYYY-MM-DD — not the UTC date, which is a different day for part of every timezone's evening or morning. `getTodayISODate() // "2026-08-16"`
- **`isDateInFuture(date)`** — Checks whether a date is strictly in the future. `isDateInFuture(new Date("2030-01-01")) // true`
- **`isDateInPast(date)`** — Checks whether a date is strictly in the past. `isDateInPast(new Date("2020-01-01")) // true`
- **`isDateToday(date)`** — Checks whether a date falls on today's calendar day. `isDateToday(new Date()) // true`
- **`isISODateAfter(isoA, isoB)`** — Checks whether one ISO date string is strictly after another. `isISODateAfter("2024-01-16", "2024-01-15") // true`
- **`isISODateBefore(isoA, isoB)`** — Checks whether one ISO date string is strictly before another. `isISODateBefore("2024-01-15", "2024-01-16") // true`
- **`isISODateInFuture(isoString)`** — Checks whether an ISO date string is in the future. `isISODateInFuture("2030-01-15T00:00:00.000Z") // true`
- **`isISODateInPast(isoString)`** — Checks whether an ISO date string is in the past. `isISODateInPast("2020-01-15T00:00:00.000Z") // true`
- **`isISODateToday(isoString)`** — Checks whether an ISO date string falls on today's local date. `isISODateToday(new Date().toISOString()) // true`
- **`isMillisInFuture(millis)`** — Checks whether a milliseconds timestamp is in the future. `isMillisInFuture(1893456000000) // true`
- **`isMillisInPast(millis)`** — Checks whether a milliseconds timestamp is in the past. `isMillisInPast(1705276800000) // true`
- **`isMillisToday(millis)`** — Checks whether a milliseconds timestamp falls on today's local date. `isMillisToday(Date.now()) // true`
- **`isValidDate(date)`** — Type guard for valid `Date` instances. `isValidDate(new Date("invalid")) // false`
- **`isValidISODateString(str)`** — Checks whether a string is a valid ISO 8601 date-time string. `isValidISODateString("2024-01-15T10:30:00.000Z") // true`
- **`isValidISODate(str)`** — Checks whether a string is a valid YYYY-MM-DD ISO date. `isValidISODate("2024-01-15") // true`
- **`isValidMillis(value)`** — Checks whether a value is a valid non-negative milliseconds timestamp. `isValidMillis(1705276800000) // true`
- **`MILLIS_PER_SECOND`** — Milliseconds in one second.
- **`MILLIS_PER_MINUTE`** — Milliseconds in one minute.
- **`MILLIS_PER_HOUR`** — Milliseconds in one hour.
- **`MILLIS_PER_DAY`** — Milliseconds in one day.
- **`MILLIS_PER_WEEK`** — Milliseconds in one week.
- **`subtractDaysFromDate(date, days)`** — Subtracts days from a Date. `subtractDaysFromDate(new Date("2024-01-15"), 5) // Date for 2024-01-10`
- **`subtractDaysFromISODate(isoString, days)`** — Subtracts days from an ISO date string and returns a new ISO string. `subtractDaysFromISODate("2024-01-15T00:00:00.000Z", 5) // "2024-01-10T00:00:00.000Z"`
- **`subtractDaysFromMillis(millis, days)`** — Subtracts days from a milliseconds timestamp. `subtractDaysFromMillis(millis, 5) // 5 × 24h earlier`
- **`subtractHoursFromDate(date, hours)`** — Subtracts hours from a Date. `subtractHoursFromDate(date, 2) // 2 hours earlier`
- **`subtractHoursFromISODate(isoString, hours)`** — Subtracts hours from an ISO date string and returns a new ISO string. `subtractHoursFromISODate(isoString, 2) // 2 hours earlier`
- **`subtractHoursFromMillis(millis, hours)`** — Subtracts hours from a milliseconds timestamp. `subtractHoursFromMillis(millis, 2) // 2 hours earlier`
- **`subtractMinutesFromDate(date, minutes)`** — Subtracts minutes from a Date. `subtractMinutesFromDate(date, 2) // 2 minutes earlier`
- **`subtractMinutesFromISODate(isoString, minutes)`** — Subtracts minutes from an ISO date string and returns a new ISO string. `subtractMinutesFromISODate(isoString, 2) // 2 minutes earlier`
- **`subtractMinutesFromMillis(millis, minutes)`** — Subtracts minutes from a milliseconds timestamp. `subtractMinutesFromMillis(millis, 2) // 2 minutes earlier`
- **`subtractMonthsFromDate(date, months)`** — Subtracts calendar months from a Date, clamping to the last day when the target month is shorter. `subtractMonthsFromDate(date, 2) // 2 months earlier`
- **`subtractMonthsFromISODate(isoString, months)`** — Subtracts calendar months from an ISO date string and returns a new ISO string, clamping to the last day when the target month is shorter. `subtractMonthsFromISODate(isoString, 2) // 2 months earlier`
- **`subtractMonthsFromMillis(millis, months)`** — Subtracts calendar months from a milliseconds timestamp, clamping to the last day when the target month is shorter. `subtractMonthsFromMillis(millis, 2) // 2 months earlier`
- **`subtractYearsFromDate(date, years)`** — Subtracts calendar years from a Date, clamping Feb 29 to Feb 28 in a non-leap target year. `subtractYearsFromDate(date, 2) // 2 years earlier`
- **`subtractYearsFromISODate(isoString, years)`** — Subtracts calendar years from an ISO date string and returns a new ISO string, clamping Feb 29 to Feb 28 in a non-leap target year. `subtractYearsFromISODate(isoString, 2) // 2 years earlier`
- **`subtractYearsFromMillis(millis, years)`** — Subtracts calendar years from a milliseconds timestamp, clamping Feb 29 to Feb 28 in a non-leap target year. `subtractYearsFromMillis(millis, 2) // 2 years earlier`

</details>

#### `error`

```ts
catch (error) {
  toast.error(formatError(error, { messageForCode: (c) => AUTH_MESSAGES[c] }));
  if (hasErrorStatusCode(error, 429)) wait(getErrorRetryAfterSeconds(error));
}
```

<details>
<summary>All 11 exports</summary>

- **`firebaseError`** — See source.
- **`authMessages`** — See source.
- **`formatAuthError(error, options)`** — Like `formatError`, but unwraps `response.data.error` FIRST — auth providers wrap the real error there, and the outer envelope's message ("Request failed with status 400") is never the one to show a user. `formatAuthError(err, { messageForCode: (c) => AUTH_MESSAGES[c] }) // "Incorrect password"`
- **`formatError(error, options)`** — One displayable string from an error of any shape — HTTP-like, Firebase-shaped, `Error`, or a bare string. `formatError(err) // "Request failed: /events"`
- **`getErrorMessage(error)`** — A displayable message from an unknown error, drilling into `response.data.{message,error,errors}` when present. `getErrorMessage(err) // "Event not found"`
- **`getErrorRetryAfterSeconds(error)`** — The Retry-After delay of a 429 response, in whole seconds — the header first, then a structured `response.data.error.details.retryAfter` fallback. `getErrorRetryAfterSeconds(err) // 30`
- **`getErrorStatusCode(error)`** — Reads the HTTP status code from an HTTP-shaped error, preferring `response.status` over `status`, and returns `undefined` for anything that is not one. `getErrorStatusCode(err) // 404`
- **`hasErrorStatusCode(error, statusCode)`** — Checks whether an error carries a specific HTTP status code. `hasErrorStatusCode(err, 404) // true`
- **`isError(value)`** — Narrows an unknown value to `Error` via `instanceof`. `isError(new Error("oops")) // true`
- **`isHttpError(error)`** — Narrows an unknown value to an HTTP-shaped error — anything carrying a numeric `status`, a `response.status`, or an `isAxiosError` flag. `isHttpError({ response: { status: 404 } }) // true`
- **`isMaintenanceError(error, options)`** — Whether an error means "the platform is deliberately down", so an error boundary can render the maintenance page instead of "Something went wrong". `isMaintenanceError(err) // true`

Types: `HttpErrorLikeProps`

</details>

#### `firestore`

```ts
const date = parseFirestoreTimestampToDate(doc.createdAt); // any wire/SDK shape, or null
events.sort((a, b) => getFirestoreTimestampSortMillis(a.startsAt) - getFirestoreTimestampSortMillis(b.startsAt));
<input type="datetime-local" value={convertFirestoreTimestampToDateTimeLocal(event.startsAt)} />
```

<details>
<summary>All 27 exports</summary>

- **`MILLIS`** — See source.
- **`SECONDS`** — See source.
- **`makeTimestampLike(seconds, nanoseconds = 0)`** — See source.
- **`compareFirestoreTimestamps(a, b)`** — Comparator for sorting any timestamp shapes — `docs.sort((a, b) => compareFirestoreTimestamps(a.createdAt, b.createdAt))` ascends. `[later, earlier].sort(compareFirestoreTimestamps) // [earlier, later]`
- **`convertFirestoreTimestampToDateTimeLocal(value)`** — Converts any Firestore timestamp representation (or Date, or unix millis) to the `YYYY-MM-DDTHH:mm` value an `<input type="datetime-local">` expects. `convertFirestoreTimestampToDateTimeLocal({ _seconds: 1789459200 }) // "2026-09-23T10:00"`
- **`convertFirestoreTimestampToDate(timestamp)`** — Exact conversion of a Timestamp (live or serialized) to a JS Date — the typed counterpart of `parseFirestoreTimestampToDate`, for values already known to be timestamps. `convertFirestoreTimestampToDate({ seconds: 1705276800, nanoseconds: 0 }) // Date`
- **`convertFirestoreTimestampToISOString(timestamp)`** — Exact conversion of a Timestamp (live or serialized) to a full ISO 8601 string. `convertFirestoreTimestampToISOString({ seconds: 1705276800, nanoseconds: 0 }) // "2024-01-15T00:00:00.000Z"`
- **`convertFirestoreTimestampToMillis(timestamp)`** — Exact conversion of a Timestamp (live or serialized) to unix milliseconds. `convertFirestoreTimestampToMillis({ seconds: 1705276800, nanoseconds: 0 }) // 1705276800000`
- **`createSerializedFirestoreTimestampFromDate(date)`** — The `{ seconds, nanoseconds }` wire shape for a Date — for fixtures and JSON payloads without the SDK. `createSerializedFirestoreTimestampFromDate(new Date(1705276800000)) // { seconds: 1705276800, nanoseconds: 0 }`
- **`createSerializedFirestoreTimestampFromMillis(millis)`** — The `{ seconds, nanoseconds }` wire shape for a unix-milliseconds moment — for fixtures and JSON payloads without the SDK. `createSerializedFirestoreTimestampFromMillis(1705276800500) // { seconds: 1705276800, nanoseconds: 500000000 }`
- **`createSerializedFirestoreTimestampNow()`** — The `{ seconds, nanoseconds }` wire shape for the current moment. `createSerializedFirestoreTimestampNow() // { seconds: 1705276800, nanoseconds: 0 }`
- **`formatFirestoreTimestampToIsoDate(value, fallback = "—")`** — The LOCAL calendar date of any timestamp shape as YYYY-MM-DD — not the UTC date, which is a different day for part of every timezone's evening or morning. `formatFirestoreTimestampToIsoDate({ _seconds: 1705276800 }) // "2024-01-15"`
- **`formatFirestoreTimestampToOrdinalDate(value, fallback = "—")`** — An ordinal date ("22nd Jun, 2023") from any timestamp shape, with a fallback for anything unparseable. `formatFirestoreTimestampToOrdinalDate({ _seconds: 1705276800 }) // "15th Jan, 2024"`
- **`formatFirestoreTimestampToReadableDateTime(value, options)`** — A localized long date with the time ("January 15, 2024 at 3:30 PM") from any timestamp shape, with a fallback for anything unparseable. `formatFirestoreTimestampToReadableDateTime({ _seconds: 1705276800 }) // "January 15, 2024 at 12:00 AM"`
- **`formatFirestoreTimestampToReadableDate(value, options)`** — A localized long date ("January 15, 2024") from any timestamp shape, with a fallback for anything unparseable — the display formatter wire data needs. `formatFirestoreTimestampToReadableDate({ _seconds: 1705276800 }) // "January 15, 2024"`
- **`formatFirestoreTimestampToRelativeShort(value, fallback = "—")`** — Compact relative time for tight UI ("5m ago", "in 3d") from any timestamp shape, with a fallback for anything unparseable. `formatFirestoreTimestampToRelativeShort(doc.createdAt) // "5m ago"`
- **`formatFirestoreTimestampToRelative(value, options)`** — Relative time ("2 hours ago", "in 3 days") from any timestamp shape, with a fallback for anything unparseable. `formatFirestoreTimestampToRelative(doc.createdAt) // "2 hours ago"`
- **`formatFirestoreTimestampToShortDate(value, options)`** — A localized numeric date ("1/15/24" in en-US) from any timestamp shape, with a fallback for anything unparseable. `formatFirestoreTimestampToShortDate({ _seconds: 1705276800 }, { locale: "en-US" }) // "1/15/24"`
- **`getFirestoreTimestampSortMillis(value)`** — Unix milliseconds from any Firestore timestamp representation, with `0` for anything unparseable — a deliberate "very old" sentinel so sort and compare pipelines never branch on null. `getFirestoreTimestampSortMillis({ _seconds: 1705276800 }) // 1705276800000`
- **`getTimeFromFirestoreTimestamp(value, fallback = "—")`** — The HH:MM:SS portion of any timestamp shape, in local time, with a fallback for anything unparseable. `getTimeFromFirestoreTimestamp(event.startsAt) // "15:30:45"`
- **`isFirestoreTimestampInFuture(value)`** — Whether any timestamp shape is strictly in the future. `isFirestoreTimestampInFuture(event.startsAt) // true`
- **`isFirestoreTimestampInPast(value)`** — Whether any timestamp shape is strictly in the past. `isFirestoreTimestampInPast(event.endsAt) // true`
- **`isFirestoreTimestampToday(value)`** — Whether any timestamp shape falls on today's LOCAL calendar day. `isFirestoreTimestampToday(doc.createdAt) // true`
- **`isFirestoreTimestamp(value)`** — Whether a value walks and quacks like a Firestore Timestamp instance — numeric `seconds` and `nanoseconds` plus the `toDate`/`toMillis` methods. `isFirestoreTimestamp(Timestamp.now()) // true`
- **`isSerializedFirestoreTimestamp(value)`** — Whether a value is the serialized `{ seconds }` / `{ _seconds }` wire shape of a Firestore Timestamp — plain data, no methods. `isSerializedFirestoreTimestamp({ _seconds: 1705276800, _nanoseconds: 0 }) // true`
- **`isValidFirestoreTimestampInput(value)`** — Whether a value is anything `parseFirestoreTimestampToDate` can turn into a Date — a live Timestamp, a serialized shape, a Date, or unix milliseconds. `isValidFirestoreTimestampInput({ seconds: 1705276800 }) // true`
- **`parseFirestoreTimestampToDate(value)`** — Best-effort parse of any Firestore timestamp representation into a JS Date. `parseFirestoreTimestampToDate({ _seconds: 1705276800, _nanoseconds: 0 }) // Date`

Types: `FirestoreTimestampInput`, `SerializedFirestoreTimestamp`

</details>

#### `form`

```ts
const message = findFirstErrorMessage(form.formState.errors); // works at any depth
```

<details>
<summary>1 export</summary>

- **`findFirstErrorMessage(tree)`** — Walks a nested form-errors tree and returns the first leaf `message` string. `findFirstErrorMessage(errors) // "Venue name is required"`

</details>

#### `number`

```ts
formatCompactNumber(followers); // "1.5M", localized
const price = parseStringToNumber(input); // null for "", never 0
```

<details>
<summary>All 23 exports</summary>

- **`calculateNumberFromPercentage(percentage, total)`** — Returns the value of a percentage of a total. `calculateNumberFromPercentage(25, 100) // 25`
- **`calculateNumberPercentage(value, total, decimals = 2)`** — Returns the percentage of a value relative to a total, rounded to N decimals. `calculateNumberPercentage(1, 3) // 33.33`
- **`clampNumber(num, min, max)`** — Clamps a number between minimum and maximum values. `clampNumber(15, 0, 10) // 10`
- **`convertNumberToOrdinal(num)`** — Converts a number to its ordinal string representation. `convertNumberToOrdinal(22) // "22nd"`
- **`formatCompactNumber(value, locale)`** — Compact notation for dashboards — "1.5M", "82K" — via Intl, so it localizes ("150万" under ja-JP) instead of hand-picking English suffixes. `formatCompactNumber(1_500_000) // "1.5M"`
- **`formatDecimalInputWithCommas(raw)`** — Formats a raw decimal-input string with thousands separators, preserving a partial/trailing decimal so it stays usable mid-typing. `formatDecimalInputWithCommas("1234567.8") // "1,234,567.8"`
- **`formatNumberAsPercent(num, decimals = 1)`** — Formats a 0-1 number as a percentage string. `formatNumberAsPercent(0.123) // "12.3%"`
- **`formatNumberToDecimal(num, decimals)`** — Formats a number with a fixed number of decimal places. `formatNumberToDecimal(3.14159, 2) // "3.14"`
- **`formatNumberWithCommas(num, decimals = 0)`** — Formats a number with commas and N decimal places. `formatNumberWithCommas(1234567.891, 2) // "1,234,567.89"`
- **`formatNumberWithLocale(num, locale = "en-US", options)`** — Formats a number using locale-specific formatting. `formatNumberWithLocale(1234567.89, "de-DE") // "1.234.567,89"`
- **`isNumberEven(num)`** — Checks whether a number is even. `isNumberEven(4) // true`
- **`isNumberInRange(num, min, max)`** — Checks whether a number is within an inclusive range. `isNumberInRange(5, 1, 10) // true`
- **`isNumberInteger(num)`** — Checks whether a number is an integer. `isNumberInteger(5.5) // false`
- **`isNumberNegative(num)`** — Checks whether a number is negative. `isNumberNegative(-5) // true`
- **`isNumberOdd(num)`** — Checks whether a number is odd. `isNumberOdd(5) // true`
- **`isNumberPositive(num)`** — Checks whether a number is positive. `isNumberPositive(5) // true`
- **`isNumber(value)`** — Checks whether a value is a finite number (excludes NaN/Infinity). `isNumber(NaN) // false`
- **`mapNumberToRange(value, fromMin, fromMax, toMin, toMax)`** — Maps a number linearly from one range to another. `mapNumberToRange(5, 0, 10, 0, 100) // 50`
- **`parseStringToNumber(value)`** — Parses a string to a finite number, or `null` — never a guess. `parseStringToNumber("12.5") // 12.5`
- **`roundNumberToDecimal(num, decimals)`** — Rounds a number to N decimal places. `roundNumberToDecimal(123.456, 2) // 123.46`
- **`roundNumberToNearest(num, nearest)`** — Rounds a number to the nearest increment. `roundNumberToNearest(23, 5) // 25`
- **`sanitizeDecimalInput(input)`** — Strips a numeric-input string down to digits and a single decimal point. `sanitizeDecimalInput("$1,2.3.4") // "12.34"`
- **`stripNumberLeadingZeros(value)`** — Strips leading zeros from a numeric string. `stripNumberLeadingZeros("0045") // "45"`

</details>

#### `random`

```ts
const code = generateReadableCode(); // "K3F7-9TXM", crypto-random, no ambiguous chars
const otp = generateNumericCode(6); // crypto-random too — users redeem these
```

<details>
<summary>All 8 exports</summary>

- **`generateNumericCode(length)`** — A random numeric code — an OTP, a verification code. `generateNumericCode(6) // "482913"`
- **`generateRandomString(length = 8)`** — A random alphanumeric string. `generateRandomString(8) // "aB3dE9fG"`
- **`generateReadableCode(length = 8, groupSize = 4, separator = "-")`** — Generates a human-readable code (uppercase + digits, ambiguous chars excluded) grouped with a separator — suitable for share-with-attendee codes like album passcodes. `generateReadableCode() // "K3F7-9TXM"`
- **`generateTransactionRef(uid)`** — A reference combining the tail of an id with a random suffix — traceable to its owner at a glance, unique enough not to collide. `generateTransactionRef("user12345678") // "12345678-aB3dE9fG"`
- **`generateUuid()`** — A UUID v4 via the runtime's `crypto.randomUUID` — no library. `generateUuid() // "550e8400-e29b-41d4-a716-446655440000"`
- **`getRandomNumberBetween(min, max)`** — A random integer between `min` and `max`, both inclusive. `getRandomNumberBetween(1, 6) // 4`
- **`READABLE_CODE_REGEX`** — Matches the default readable-code format `generateReadableCode` produces: two 4-char groups of uppercase letters + digits (ambiguous I, L, O, 0, 1 excluded), dash-separated. `READABLE_CODE_REGEX.test("K3F7-9TXM") // true`
- **`sanitizeReadableCodeInput(raw)`** — Sanitizes raw keyboard input into readable-code format as the user types. `sanitizeReadableCodeInput("k3f79txm") // "K3F7-9TXM"`

</details>

#### `string`

```ts
convertStringToKebabCase("v2 Rollout"); // "v2-rollout" — digits stay attached
truncateString(title, 60); // never exceeds 60, ellipsis included
maskString(cardNumber); // "••••••••••••4242"
```

<details>
<summary>All 23 exports</summary>

- **`capitalizeString(value)`** — Upper-cases the first character and leaves the rest alone. `capitalizeString("hello") // "Hello"`
- **`convertStringToCamelCase(value)`** — Converts a string to camelCase, keeping digits attached to their word ("v2 rollout" becomes "v2Rollout"). `convertStringToCamelCase("hello world") // "helloWorld"`
- **`convertStringToKebabCase(value)`** — Converts a string to kebab-case, keeping digits attached to their word ("v2 Rollout" becomes "v2-rollout"). `convertStringToKebabCase("HelloWorld") // "hello-world"`
- **`convertStringToSnakeCase(value)`** — Converts a string to snake_case, keeping digits attached to their word ("v2 Rollout" becomes "v2_rollout"). `convertStringToSnakeCase("HelloWorld") // "hello_world"`
- **`convertStringToTitleCase(value)`** — Title-cases every word, splitting on camelCase humps as well as spaces. `convertStringToTitleCase("hello world") // "Hello World"`
- **`convertStringToUpperSnakeCase(value)`** — Converts a string to UPPER_SNAKE_CASE, keeping digits attached to their word and stripping any character that is not A-Z, 0-9, or underscore. `convertStringToUpperSnakeCase("my new flag") // "MY_NEW_FLAG"`
- **`countWordsInString(value)`** — Counts the whitespace-separated words in a string, returning 0 for empty or blank input. `countWordsInString("hello world") // 2`
- **`createSlugFromNameAndId(name, id)`** — Builds a `name-id` URL slug. `createSlugFromNameAndId(" Summer  Fête! ", "a1b2") // "summer-fete-a1b2"`
- **`decodeBase64Url(value)`** — Decodes a base64url string — base64 with `-`/`_` instead of `+`/`/`, and padding dropped. `decodeBase64Url("eyJhIjoxfQ") // '{"a":1}'`
- **`encodeBase64Url(value)`** — Encodes a string as base64url — base64 with `-`/`_` instead of `+`/`/` and no padding, the encoding JWT segments and URL-safe tokens use. `encodeBase64Url('{"a":1}') // "eyJhIjoxfQ"`
- **`extractIdFromSlug(slug)`** — Returns the segment after the last hyphen of a URL-decoded slug — the id in `name-id` slugs. `extractIdFromSlug("summer-fete-a1b2") // "a1b2"`
- **`extractNameFromSlug(slug)`** — Returns everything before the last hyphen of a URL-decoded slug with hyphens turned into spaces — the name in `name-id` slugs. `extractNameFromSlug("summer-fete-a1b2") // "summer fete"`
- **`extractSocialUsername(value)`** — Pulls a handle out of whatever a user pasted into a "social link" field — a full URL, a bare `@handle`, or the handle alone. `extractSocialUsername("https://instagram.com/timonwa/") // "timonwa"`
- **`extractUuidFromPath(path)`** — Pulls the first UUID out of a path or key. `extractUuidFromPath("/f/3f2504e0-4f89-11d3-9a0c-0305e82c3301/raw/a.jpg")`
- **`humanizeConstant(value)`** — Turns a CONSTANT_NAME into a sentence-cased label. `humanizeConstant("arts_and_culture") // "Arts and culture"`
- **`isStringPalindrome(value)`** — Whether a string reads the same both ways, ignoring case and anything that is not a letter or digit — so "A man, a plan, a canal: Panama" qualifies. `isStringPalindrome("racecar") // true`
- **`maskString(value, visibleCharacters = 4)`** — Hides all but the trailing characters of a sensitive value. `maskString("4242424242424242") // "••••••••••••4242"`
- **`normalizeStringWhitespace(value)`** — Collapses every run of whitespace into a single space and trims the ends. `normalizeStringWhitespace("hello    world ") // "hello world"`
- **`reverseString(value)`** — Reverses a string by code point, so astral characters survive. `reverseString("hello") // "olleh"`
- **`splitFullName(fullName)`** — Splits a full name into a first name and everything after it. `splitFullName("Ada Lovelace") // { firstName: "Ada", lastName: "Lovelace" }`
- **`stripHtmlTagsFromString(value)`** — Removes anything that looks like a tag, for producing a plain-text excerpt. `stripHtmlTagsFromString("<p>Hello</p>") // "Hello"`
- **`stripToAlphanumeric(value)`** — Reduces a string to lowercase letters and digits, for use as a comparison key. `stripToAlphanumeric("O'Brien-Smith") // "obriensmith"`
- **`truncateString(value, maxLength, ellipsis = "…")`** — Shortens a string to at most `maxLength` characters, ellipsis included. `truncateString("This is a long string", 10) // "This is a…"`

</details>

#### `time`

```ts
formatMillisToShortDuration(runtime); // "2h 30m"
convertTimeTo12Hour(14, 30); // "2:30 PM"
```

<details>
<summary>All 16 exports</summary>

- **`addMinutesToTime(timeString, minutesToAdd)`** — Adds minutes to a time string. `addMinutesToTime("14:30", 45) // "15:15"`
- **`convertTimeTo12Hour(hours, minutes)`** — Converts a 24-hour time to a 12-hour string with AM/PM. `convertTimeTo12Hour(14, 30) // "2:30 PM"`
- **`convertTimeTo24Hour(hours, minutes, period)`** — Converts a 12-hour time to 24-hour components. `convertTimeTo24Hour(2, 30, "PM") // { hours: 14, minutes: 30 }`
- **`floorDateTimeLocalToHalfHour(value)`** — Floors a `YYYY-MM-DDTHH:mm` string to the preceding half-hour (`:00` or `:30`). `floorDateTimeLocalToHalfHour("2026-09-23T10:42") // "2026-09-23T10:30"`
- **`floorDateTimeLocalToHour(value)`** — Floors a `YYYY-MM-DDTHH:mm` string — the format `<input type="datetime-local">` produces — to the top of its hour. `floorDateTimeLocalToHour("2026-09-23T10:42") // "2026-09-23T10:00"`
- **`formatMillisToDuration(ms)`** — Formats a duration in milliseconds as a human-readable string. `formatMillisToDuration(90061000) // "1 day, 1 hour, 1 minute, 1 second"`
- **`formatMillisToShortDuration(ms)`** — Formats a duration in milliseconds as a short string (e.g., `2h 30m`). `formatMillisToShortDuration(9000000) // "2h 30m"`
- **`formatMillisToTime(ms)`** — Formats a duration in milliseconds as a time string (HH:MM:SS). `formatMillisToTime(3661000) // "01:01:01"`
- **`formatSecondsToTime(totalSeconds, includeHours = true)`** — Formats a duration in seconds as HH:MM:SS or MM:SS. `formatSecondsToTime(3661) // "01:01:01"`
- **`formatTimeTo12Hour(time)`** — Formats an HH:MM time string in 12-hour format with AM/PM. `formatTimeTo12Hour("14:30") // "2:30 PM"`
- **`getTimeComponents(date)`** — Gets hours, minutes, and seconds from a Date. `getTimeComponents(new Date("2024-01-15T15:30:45")) // { hours: 15, minutes: 30, seconds: 45 }`
- **`getTimeDifferenceInMillis(startTime, endTime)`** — Gets the difference (in ms) between two HH:MM or HH:MM:SS time strings. `getTimeDifferenceInMillis("14:00", "16:30") // 9000000`
- **`getTimeFromDate(date)`** — Gets the HH:MM:SS portion from a Date. `getTimeFromDate(new Date("2024-01-15T15:30:45")) // "15:30:45"`
- **`isTimeInRange(time, startTime, endTime)`** — Checks whether an HH:MM time string is within an inclusive range. `isTimeInRange("14:00", "09:00", "17:00") // true`
- **`isValidTimeString(timeString)`** — Checks whether a string is a valid HH:MM or HH:MM:SS time. `isValidTimeString("25:00") // false`
- **`parseTimeString(timeString)`** — Parses an HH:MM or HH:MM:SS string into numeric components. `parseTimeString("14:30") // { hours: 14, minutes: 30, seconds: 0 }`

</details>

#### `url`

```ts
router.push(safeRedirectPath(searchParams.get("redirect"), "/")); // open-redirect safe
getOgImageUrl({ siteUrl, title: post.title }); // cover image or generated OG endpoint
```

<details>
<summary>All 2 exports</summary>

- **`getOgImageUrl(options)`** — Build the OG image URL for a page.
- **`safeRedirectPath(redirect, fallback)`** — Validates a `?redirect=...` query value before pushing the user to it. `safeRedirectPath("/account", "/") // "/account"`

Types: `OgImageArgsProps`

</details>

#### `validation`

```ts
const result = validateEmail(input); // { valid: false, message: "Invalid email format" }
const results = validateFiles(files, (f) => validateImageFile(f, MY_TYPES));
if (hasValidationErrors(results)) show(results);
```

<details>
<summary>All 18 exports</summary>

- **`file`** — See source.
- **`hasValidationErrors(results)`** — Checks whether any result in a list of validation results is invalid. `hasValidationErrors(results) // true when any result is invalid`
- **`DEFAULT_DOCUMENT_TYPES`** — Word and PDF; pass your product's own list to change the policy.
- **`validateDocumentFile(file, allowedTypes = DEFAULT_DOCUMENT_TYPES)`** — Validates a file's MIME type against an allowed list, defaulting to Word and PDF. `validateDocumentFile(file) // { valid: true }`
- **`validateEmail(email)`** — Format-level email check — `something@something.tld`. `validateEmail("test@example.com") // { valid: true }`
- **`validateFileSize(file, maxSizeInMb)`** — Validates that a file is no larger than `maxSizeInMb` megabytes. `validateFileSize(file, 5) // { valid: true }`
- **`validateFileType(file, allowedTypes)`** — Validates a file's MIME type against an explicit list of allowed types. `validateFileType(file, ["image/png"]) // { valid: true }`
- **`validateFiles(files, validator)`** — Runs one validator over a list of files, returning a result per file. `validateFiles(files, validateImageFile) // one result per file`
- **`DEFAULT_IMAGE_TYPES`** — The web-safe default; pass your product's own policy to narrow or widen it.
- **`validateImageFile(file, allowedTypes = DEFAULT_IMAGE_TYPES)`** — Validates a file's MIME type against an allowed list, defaulting to the web-safe image set (JPEG, PNG, WebP, GIF). `validateImageFile(file) // { valid: true }`
- **`validateNumberRange(value, min, max, fieldName = "Value")`** — Validates that a number falls within an inclusive min-max range. `validateNumberRange(5, 1, 10) // { valid: true }`
- **`validatePassword(password, options)`** — Password rules, each toggleable. `validatePassword("Password123") // { valid: true, messages: [] }`
- **`validatePdfFile(file)`** — Validates that a file's MIME type is `application/pdf`. `validatePdfFile(file) // { valid: true }`
- **`validateRequired(value, fieldName)`** — Non-empty check across the shapes a form produces — `undefined`, `null`, a whitespace-only string, or an empty array all fail. `validateRequired("", "Name") // { valid: false, message: "Name is required" }`
- **`validateStringLength(value, minLength, maxLength, fieldName = "Field")`** — Validates that a string's length falls within an inclusive min-max range. `validateStringLength("hello", 1, 10) // { valid: true }`
- **`validateUrl(url)`** — Validates that a string parses as an absolute URL via the `URL` constructor. `validateUrl("https://example.com") // { valid: true }`
- **`DEFAULT_VIDEO_TYPES`** — The web-common defaults (MP4, WebM, Ogg, QuickTime); pass your own list to change the policy.
- **`validateVideoFile(file, options)`** — Validates a video file's MIME type against an allowed list (defaulting to `DEFAULT_VIDEO_TYPES`) and, when `maxSizeBytes` is set, its size. `validateVideoFile(file, { maxSizeBytes: 50_000_000 }) // { valid: true }`

Types: `ValidatePasswordOptions`

</details>

### Browser — `@timonwa/app-utilities/browser`

#### `browser/clipboard`

```ts
const copied = await copyTextToClipboard(inviteCode);
setLabel(copied ? "Copied" : "Press ⌘C");
```

<details>
<summary>All 2 exports</summary>

- **`copyTextToClipboard(text)`** — Copies text to the clipboard.
- **`readTextFromClipboard()`** — Reads text from the clipboard.

</details>

#### `browser/image`

```ts
const upload = await compressImage(file, { maxWidth: 1920, quality: 0.8 });
// returns the ORIGINAL file if compression came out larger
```

<details>
<summary>1 export</summary>

- **`compressImage(file, options)`** — Compresses and/or resizes an image File on the client via the Canvas API, preserving aspect ratio when only one dimension constrains. `const upload = await compressImage(file, { maxWidth: 1920, quality: 0.8 });`

Types: `CompressImageOptionsProps`

</details>

#### `browser/storage`

```ts
setLocalStorageItemWithExpiry("token", token, 3_600_000);
const token = getLocalStorageItemWithExpiry<string>("token"); // undefined once expired
```

<details>
<summary>All 22 exports</summary>

- **`installStorageMocks()`** — See source.
- **`installThrowingStorageMocks()`** — See source.
- **`clearLocalStorage()`** — Clears all items from localStorage. `clearLocalStorage()`
- **`clearSessionStorage()`** — Clears all items from sessionStorage. `clearSessionStorage()`
- **`getLocalStorageItemWithExpiry(key)`** — Gets an item from localStorage, returning undefined if expired. `getLocalStorageItemWithExpiry<string>("token") // "abc123"`
- **`getLocalStorageItem(key, defaultValue)`** — Gets an item from localStorage with JSON parsing. `getLocalStorageItem<User>("user") // { id: 1, name: "John" }`
- **`getLocalStorageKeys()`** — Gets all keys from localStorage. `getLocalStorageKeys() // ["user", "settings"]`
- **`getLocalStorageSize()`** — Gets the approximate size of localStorage in bytes (UTF-16 estimate). `getLocalStorageSize() // 1024`
- **`getSessionStorageItemWithExpiry(key)`** — Gets an item from sessionStorage, returning undefined if expired. `getSessionStorageItemWithExpiry<string>("draft")`
- **`getSessionStorageItem(key, defaultValue)`** — Gets an item from sessionStorage with JSON parsing. `getSessionStorageItem<TempData>("tempData") // { step: 1 }`
- **`getSessionStorageKeys()`** — Gets all keys from sessionStorage. `getSessionStorageKeys() // ["checkout-step"]`
- **`getSessionStorageSize()`** — Approximate sessionStorage footprint in bytes (UTF-16 uses 2 bytes per character). `getSessionStorageSize() // 1024`
- **`hasLocalStorageItem(key)`** — Checks whether a key exists in localStorage. `hasLocalStorageItem("user") // true`
- **`hasSessionStorageItem(key)`** — Checks whether a key exists in sessionStorage. `hasSessionStorageItem("tempData") // true`
- **`isLocalStorageAvailable()`** — Checks whether localStorage is available in the current environment. `if (isLocalStorageAvailable()) { useLocalStorage(); }`
- **`isSessionStorageAvailable()`** — Checks whether sessionStorage is available in the current environment. `if (isSessionStorageAvailable()) { useSessionStorage(); }`
- **`removeLocalStorageItem(key)`** — Removes an item from localStorage. `removeLocalStorageItem("user")`
- **`removeSessionStorageItem(key)`** — Removes an item from sessionStorage. `removeSessionStorageItem("tempData")`
- **`setLocalStorageItemWithExpiry(key, value, expiryMs)`** — Sets an item in localStorage with an expiry timestamp. `setLocalStorageItemWithExpiry("token", "abc123", 3600000)`
- **`setLocalStorageItem(key, value)`** — Sets an item in localStorage with JSON serialization. `setLocalStorageItem("user", { id: 1, name: "John" })`
- **`setSessionStorageItemWithExpiry(key, value, expiryMs)`** — Sets an item in sessionStorage with an expiry timestamp. `setSessionStorageItemWithExpiry("draft", data, 3_600_000)`
- **`setSessionStorageItem(key, value)`** — Sets an item in sessionStorage with JSON serialization. `setSessionStorageItem("tempData", { step: 1 })`

</details>

<!-- api:end -->

## Conventions

The rules every function follows:

- **Verb-first, descriptive names.** `convertBytesToMegabytes`, not `toMB`. `parse*` returns `T | null` and never guesses; `format*` degrades and never throws; `convert*` is exact and never rounds.
- **Inputs are never mutated**, and `null`/`undefined` are tolerated everywhere.
- **Intl over hand-rolled locale logic** — relative time, compact numbers, currency symbols, and minor-unit digits all come from the runtime, so there are no lookup tables to go stale.
- **Nothing project-specific is baked in.** Watermark ids, allowed file types, maintenance codes, OG endpoints — all parameters with sensible defaults.

## Contributing

Bug reports and PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
