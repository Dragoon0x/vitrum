import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Mirror of the path rewriting the CLI applies on install, so the code a
 * reader sees is exactly the code that lands in their project.
 */
const DISPLAY_TRANSFORMS: readonly [RegExp, string][] = [
  [/@\/registry\/vitrum\/ui\//g, "@/components/ui/"],
  [/@\/registry\/vitrum\/lib\//g, "@/lib/"],
  [/@\/registry\/vitrum\/hooks\//g, "@/hooks/"],
  [/@\/registry\/vitrum\/demos\//g, "@/components/"],
];

/** All displayable sources live under registry/ — statically scoped so
 *  build tracing doesn't sweep the whole project. */
const SOURCE_ROOT = path.join(process.cwd(), "registry");

export async function getDisplaySource(relPath: string): Promise<string> {
  if (!relPath.startsWith("registry/")) {
    throw new Error(`Displayable sources must live under registry/: ${relPath}`);
  }
  const raw = await readFile(
    path.join(SOURCE_ROOT, relPath.slice("registry/".length)),
    "utf8",
  );
  let code = raw.trim();
  for (const [pattern, replacement] of DISPLAY_TRANSFORMS) {
    code = code.replace(pattern, replacement);
  }
  return code;
}
