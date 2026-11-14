import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // AI-agent skill folders (gitignored, not project code):
    ".agents/**",
    ".augment/**",
    ".claude/**",
    ".codebuddy/**",
    ".codewhale/**",
    ".continue/**",
    ".cursor/**",
    ".factory/**",
    ".gemini/**",
    ".github/prompts/**",
    ".kilocode/**",
    ".kiro/**",
    ".opencode/**",
    ".qoder/**",
    ".roo/**",
    ".trae/**",
    ".warp/**",
    ".windsurf/**",
    ".superpowers/**",
  ]),
]);

export default eslintConfig;
