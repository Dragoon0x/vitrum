import type { ComponentDoc } from "@/lib/docs/types";

import { GlassSceneDemo } from "@/registry/vitrum/demos/glass-scene-demo";

export const glassSceneDoc: ComponentDoc = {
  slug: "glass-scene",
  title: "Glass Scene",
  description:
    "Backdrop displacement needs one specific compositor, but a plain SVG filter on ordinary content works everywhere. A scene owns a backdrop and any number of lenses, bakes one displacement map — neutral except under each lens — and bends its own content in every modern browser. It activates in the frost engine and stays inert in the refract engine, where the surfaces already bend.",
  registryItem: "glass-scene",
  demos: [
    {
      id: "default",
      title: "Default",
      file: "registry/vitrum/demos/glass-scene-demo.tsx",
      component: GlassSceneDemo,
    },
  ],
  api: [
    {
      exportName: "GlassSceneLens",
      props: {
        "depth": { type: "number", default: "26", description: "Maximum bend at the rim, px." },
        "bevel": { type: "number", default: "30", description: "How far the bend reaches inward, px." },
        "curvature": { type: "number", default: "1.6", description: "Bevel profile exponent — low is a soft shoulder, high a hard rim." },
        "radius": { type: "number", default: "from chrome", description: "Corner radius override for the bend zone." },
        "specular": { type: "number", default: "0.35", description: "In-filter glint strength, 0–1." },
      },
    },
  ],
};
