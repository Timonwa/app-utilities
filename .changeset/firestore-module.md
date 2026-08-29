---
"@timonwa/app-utilities": minor
---

Add a `firestore` module — dependency-free helpers for the shapes a Firestore Timestamp actually arrives in: `parseFirestoreTimestampToDate` (any wire/SDK shape → `Date | null`), `getFirestoreTimestampSortMillis` (0-sentinel millis for sort pipelines), `convertFirestoreTimestampToDateTimeLocal` (the `datetime-local` input value), and the duck-typed `isFirestoreTimestamp` guard.

Add a `crypto` module — `hashTextToSha256Hex` (Web Crypto, async, runs in Node/browser/edge) and `isTimingSafeEqual` (constant-time string comparison for tokens and signatures, no early return on length or position).
