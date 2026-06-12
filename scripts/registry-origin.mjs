#!/usr/bin/env node
/**
 * Point the built registry at the deploy origin.
 *
 * registry.json pins internal registryDependencies to the canonical
 * placeholder origin so the source of truth stays environment-free.
 * At build time, when NEXT_PUBLIC_SITE_URL is set (Vercel, staging,
 * local prod), the built public/r artifacts are rewritten to that
 * origin so transitive installs resolve against the registry that
 * actually served them.
 */

import { execFileSync } from "node:child_process";
import process from "node:process";

const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

if (!origin) {
  console.log("registry origin: NEXT_PUBLIC_SITE_URL unset — keeping canonical URLs");
  process.exit(0);
}

if (!/^https?:\/\/[a-z0-9.:-]+$/i.test(origin)) {
  console.error(`registry origin: refusing malformed origin "${origin}"`);
  process.exit(1);
}

execFileSync(process.execPath, ["scripts/registry-localize.mjs", origin], {
  stdio: "inherit",
});
