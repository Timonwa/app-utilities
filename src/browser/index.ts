/**
 * @description The browser entry point — everything here touches a browser API. A
 * separate export so importing it is deliberate: a server component or a React Native
 * bundle pulling this in is a mistake the import line makes visible. Every function
 * still guards for its API being absent, so a stray SSR import degrades, not throws.
 */

export * from "./clipboard/index.js";
export * from "./image/index.js";
export * from "./storage/index.js";
