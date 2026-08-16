import { defineConfig } from "tsdown";

export default defineConfig({
  // Two entries, matching the two exports: the root is universal, /browser touches
  // browser APIs. Keeping them separate is what stops `localStorage` being pulled
  // into a server render or a React Native bundle.
  entry: ["src/index.ts", "src/browser/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  // Zero runtime dependencies so far, and worth keeping that way: every dependency
  // a utilities package adds is one every consumer inherits whether they use that
  // function or not. Anything added later belongs in `external` so it is not
  // duplicated for consumers who already depend on it.
  clean: true,
  treeshake: true,
  sourcemap: true,
  target: "es2022",
});
