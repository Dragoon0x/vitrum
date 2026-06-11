import { glassEngineScript } from "@/registry/vitrum/lib/glass-engine";
import { GlassDefs } from "@/registry/vitrum/ui/glass-defs";
import { GlassWatcher } from "@/registry/vitrum/ui/glass-watcher";

/**
 * Place once at the top of <body>. Resolves the glass engine before first
 * paint, mounts the shared refraction filters, and keeps the engine in
 * sync with system preferences. Without it, surfaces render in the frost
 * engine — fully styled, no refraction.
 */
export function GlassRoot() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: glassEngineScript }} />
      <GlassDefs />
      <GlassWatcher />
    </>
  );
}
