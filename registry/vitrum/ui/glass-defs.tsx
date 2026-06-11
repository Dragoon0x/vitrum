import { buildPresetDefs } from "@/registry/vitrum/lib/glass-filter";

const PRESET_DEFS = buildPresetDefs();

/**
 * Mounts the shared refraction filters once. Server-rendered static markup,
 * present at first paint so url(#…) references never dangle. Rendered by
 * <GlassRoot/>; include it directly only if you compose your own root.
 */
export function GlassDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: PRESET_DEFS }}
    />
  );
}
