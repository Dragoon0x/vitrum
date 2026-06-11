#!/usr/bin/env node
/**
 * Registry validation gate. Zero dependencies. Exits 1 on any failure.
 *
 * V1  registry.json parses; names unique kebab-case; types allowed
 * V2  every files[].path exists and is non-empty
 * V3  primary file of each ui item exports PascalCase(name)
 * V4  internal registryDependencies are well-formed URLs resolving to
 *     existing items; bare names must be official registry items
 * V5  every npm dependency declared by an item exists in package.json
 * V6  no orphans: every file under registry/vitrum/{ui,lib,hooks,theme}
 *     is referenced by exactly one item
 * V7  (post-build) public/r/<name>.json exists, parses, has content
 * V8  brand scan: no inspiration/attribution vocabulary anywhere
 * V9  animation safety: keyframes animate transform/opacity/
 *     background-position only (named exceptions for content collapse)
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const passes = [];

function check(id, ok, detail) {
  if (ok) {
    passes.push(id);
  } else {
    failures.push(`${id}: ${detail}`);
  }
}

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/* ---------------- V1: manifest shape ---------------- */

let registry;
try {
  registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
} catch (error) {
  console.error(`V1 FAIL: registry.json unreadable — ${error.message}`);
  process.exit(1);
}

const ALLOWED_TYPES = new Set([
  "registry:theme",
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:block",
  "registry:component",
  "registry:file",
  "registry:page",
  "registry:style",
]);

check("V1.name", typeof registry.name === "string" && registry.name.length > 0, "registry.name missing");
check("V1.homepage", typeof registry.homepage === "string" && registry.homepage.startsWith("https://"), "homepage must be an https URL");
check("V1.items", Array.isArray(registry.items) && registry.items.length > 0, "items missing or empty");

const names = new Set();
for (const item of registry.items ?? []) {
  check(`V1.kebab(${item.name})`, /^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.name ?? ""), "name must be kebab-case");
  check(`V1.unique(${item.name})`, !names.has(item.name), "duplicate item name");
  names.add(item.name);
  check(`V1.type(${item.name})`, ALLOWED_TYPES.has(item.type), `unknown type ${item.type}`);
  check(`V1.description(${item.name})`, typeof item.description === "string" && item.description.length > 0, "description required");
}

/* ---------------- V2: files exist ---------------- */

for (const item of registry.items ?? []) {
  for (const file of item.files ?? []) {
    const full = join(root, file.path);
    const exists = existsSync(full) && statSync(full).size > 0;
    check(`V2(${item.name}:${file.path})`, exists, "file missing or empty");
    if (file.type === "registry:file") {
      check(`V2.target(${item.name}:${file.path})`, typeof file.target === "string" && file.target.length > 0, "registry:file requires a target");
    }
  }
}

/* ---------------- V3: primary export ---------------- */

function pascal(name) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

for (const item of registry.items ?? []) {
  if (item.type !== "registry:ui") continue;
  const primary = item.files?.[0];
  if (!primary) {
    check(`V3(${item.name})`, false, "ui item has no files");
    continue;
  }
  const source = readFileSync(join(root, primary.path), "utf8");
  const expected = pascal(item.name);
  const pattern = new RegExp(
    `export (?:function|const) ${expected}\\b|export \\{[^}]*\\b${expected}\\b[^}]*\\}`,
  );
  check(`V3(${item.name})`, pattern.test(source), `primary file must export ${expected}`);
}

/* ---------------- V4: registry dependencies ---------------- */

const OFFICIAL_BARE = new Set(["utils"]);
const internalDepPattern = /^https:\/\/[a-z0-9.-]+\/r\/([a-z0-9-]+)\.json$/;

for (const item of registry.items ?? []) {
  for (const dep of item.registryDependencies ?? []) {
    if (dep.startsWith("https://")) {
      const match = dep.match(internalDepPattern);
      check(`V4.url(${item.name}→${dep})`, Boolean(match), "malformed registry dependency URL");
      if (match) {
        check(`V4.resolves(${item.name}→${match[1]})`, names.has(match[1]), "URL references unknown item");
      }
    } else {
      check(`V4.bare(${item.name}→${dep})`, OFFICIAL_BARE.has(dep), `bare registryDependency "${dep}" is not in the allowlist`);
    }
  }
}

/* ---------------- V5: npm deps installed ---------------- */

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const installed = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
]);

for (const item of registry.items ?? []) {
  for (const dep of item.dependencies ?? []) {
    const bare = dep.startsWith("@") ? dep.split("@").slice(0, 2).join("@") : dep.split("@")[0];
    check(`V5(${item.name}→${bare})`, installed.has(bare), "item dependency not installed in this repo");
  }
}

/* ---------------- V6: no orphans ---------------- */

const referenced = new Map();
for (const item of registry.items ?? []) {
  for (const file of item.files ?? []) {
    referenced.set(file.path, (referenced.get(file.path) ?? 0) + 1);
  }
}

const registryFiles = ["ui", "lib", "hooks", "theme", "blocks"]
  .flatMap((dir) => walk(join(root, "registry/vitrum", dir)))
  .map((file) => relative(root, file));

for (const file of registryFiles) {
  const count = referenced.get(file) ?? 0;
  check(`V6(${file})`, count === 1, count === 0 ? "orphan file (no registry item references it)" : "referenced by multiple items");
}

for (const [path, count] of referenced) {
  if (count > 1) check(`V6.dup(${path})`, false, "file claimed by multiple items");
}

/* ---------------- V7: build output ---------------- */

const buildDir = join(root, "public/r");
const skipBuildCheck = process.argv.includes("--pre-build");
if (!skipBuildCheck) {
  for (const item of registry.items ?? []) {
    const out = join(buildDir, `${item.name}.json`);
    if (!existsSync(out)) {
      check(`V7(${item.name})`, false, "missing public/r output — run registry:build");
      continue;
    }
    try {
      const parsed = JSON.parse(readFileSync(out, "utf8"));
      const files = parsed.files ?? [];
      check(`V7(${item.name})`, files.length > 0 && files.every((f) => typeof f.content === "string" && f.content.length > 0), "built item has empty file content");
    } catch (error) {
      check(`V7(${item.name})`, false, `unparseable build output — ${error.message}`);
    }
  }
}

/* ---------------- V8: brand scan ---------------- */

const DENYLIST = [
  "apple",
  "cupertino",
  "visionos",
  "vision os",
  "liquid glass",
  "liquidglass",
  "material design",
  "material you",
  "fluent",
  "aero",
  "aqua ui",
  "human interface",
  "glassmorph",
  "fluid functionalism",
  "fluidfunctionalism",
  "neumorph",
  "inspired by",
  "credit to",
  "based on the work",
  "hat tip",
];

const SCAN_DIRS = ["app", "components", "content", "registry", "lib", "scripts"];
const SCAN_FILES = ["README.md", "LICENSE", "package.json", "registry.json"];
const scanTargets = [
  ...SCAN_DIRS.flatMap((dir) => walk(join(root, dir))),
  ...SCAN_FILES.map((file) => join(root, file)).filter((file) => existsSync(file)),
]
  .filter((file) => /\.(tsx?|css|mjs|json|md|txt)$/.test(file) || file.endsWith("LICENSE"))
  .filter((file) => !file.endsWith("validate-registry.mjs"));

for (const file of scanTargets) {
  const content = readFileSync(file, "utf8").toLowerCase();
  for (const term of DENYLIST) {
    if (content.includes(term)) {
      const rel = relative(root, file);
      check(`V8(${rel})`, false, `contains denylisted term "${term}"`);
    }
  }
}
check("V8.scanned", scanTargets.length > 0, "brand scan found no files");

/* ---------------- V9: animation safety ---------------- */

const ALLOWED_ANIMATABLE = new Set(["transform", "opacity", "background-position"]);
const KEYFRAME_EXCEPTIONS = new Set(["vt-collapse-down", "vt-collapse-up"]);

const cssFiles = scanTargets.filter((file) => file.endsWith(".css"));
const keyframePattern = /@keyframes\s+([a-zA-Z0-9-_]+)\s*\{/g;

for (const file of cssFiles) {
  const content = readFileSync(file, "utf8");
  let match;
  while ((match = keyframePattern.exec(content)) !== null) {
    const name = match[1];
    if (KEYFRAME_EXCEPTIONS.has(name)) continue;
    let depth = 1;
    let i = keyframePattern.lastIndex;
    let body = "";
    while (depth > 0 && i < content.length) {
      const ch = content[i];
      if (ch === "{") depth += 1;
      if (ch === "}") depth -= 1;
      if (depth > 0) body += ch;
      i += 1;
    }
    const props = [...body.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1]);
    const illegal = props.filter((prop) => !ALLOWED_ANIMATABLE.has(prop));
    check(`V9(${relative(root, file)}:${name})`, illegal.length === 0, `keyframes animate non-compositable properties: ${illegal.join(", ")}`);
  }
}

/* ---------------- report ---------------- */

if (failures.length > 0) {
  console.error(`\nregistry validation: ${failures.length} failure(s), ${passes.length} checks passed\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error("");
  process.exit(1);
}

console.log(`registry validation: all ${passes.length} checks passed`);
