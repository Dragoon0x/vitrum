#!/usr/bin/env node
/**
 * Rewrite registryDependencies origins inside public/r/*.json so the
 * registry can be installed from a local server during development:
 *
 *   node scripts/registry-localize.mjs http://localhost:3000
 *
 * Mutates only the gitignored build artifact — never run in deploys.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const origin = process.argv[2];
if (!origin || !/^https?:\/\//.test(origin)) {
  console.error("usage: node scripts/registry-localize.mjs <origin>");
  process.exit(1);
}

const dir = join(process.cwd(), "public/r");
if (!existsSync(dir)) {
  console.error("public/r missing — run registry:build first");
  process.exit(1);
}

const trimmed = origin.replace(/\/$/, "");
let rewritten = 0;

for (const entry of readdirSync(dir)) {
  if (!entry.endsWith(".json")) continue;
  const file = join(dir, entry);
  const before = readFileSync(file, "utf8");
  const after = before.replaceAll("https://vitrum.dev", trimmed);
  if (after !== before) {
    writeFileSync(file, after);
    rewritten += 1;
  }
}

console.log(`localized ${rewritten} registry item(s) to ${trimmed}`);
