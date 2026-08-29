---
"@timonwa/app-utilities": minor
---

Complete the `firestore` module to the full house matrix — guards for serialized wire shapes and parser inputs, exact converters to Date/millis/ISO, serialized-shape creators (fixtures and payloads without the SDK), the full fallback-safe format family (iso/readable/readable-date-time/short/relative/relative-short/ordinal/time), and `compareFirestoreTimestamps` plus in-future/in-past/today checks. Date arithmetic stays in the `date` module — parse to a Date, do the math there, and write the Date back (Firestore accepts it natively).
