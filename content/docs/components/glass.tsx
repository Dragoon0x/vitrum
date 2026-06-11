import type { ComponentDoc } from "@/lib/docs/types";

import { GlassDemo } from "@/registry/vitrum/demos/glass-demo";
import { GlassTintDemo } from "@/registry/vitrum/demos/glass-tint-demo";

export const glassDoc: ComponentDoc = {
  slug: "glass",
  title: "Glass",
  description: "The material primitive. One element, two pseudo-layers: a refracting backdrop and a specular ring. Everything else in Vitrum is built from it.",
  registryItem: "glass",
  demos: [
    { id: "materials", title: "Materials", file: "registry/vitrum/demos/glass-demo.tsx", component: GlassDemo },
    { id: "tints", title: "Tints", file: "registry/vitrum/demos/glass-tint-demo.tsx", component: GlassTintDemo },
  ],
  api: [
    {
      exportName: "Glass",
      props: {
        "material": { type: "\"film\" | \"pane\" | \"slab\" | \"veil\"", default: "\"pane\"", description: "Optical weight of the surface." },
        "tint": { type: "\"neutral\" | \"accent\" | \"none\"", default: "\"neutral\"", description: "Color cast of the material." },
        "refract": { type: "GlassFilterId", default: "per material", description: "Pin a specific refraction preset." },
        "sheen": { type: "boolean", default: "false", description: "Soft light that follows the pointer." },
        "asChild": { type: "boolean", default: "false", description: "Merge the surface onto the child element." },
      },
    },
  ],
};
