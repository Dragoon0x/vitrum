import type { ComponentDoc } from "@/lib/docs/types";

import { LensDemo } from "@/registry/vitrum/demos/lens-demo";

export const lensDoc: ComponentDoc = {
  slug: "lens",
  title: "Lens",
  description: "A disc of optical glass that trails the pointer and magnifies whatever lies beneath. Decorative by design \u2014 absent on touch and under reduced motion.",
  registryItem: "lens",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/lens-demo.tsx", component: LensDemo },
  ],
  api: [
    {
      exportName: "Lens",
      props: {
        "size": { type: "number", default: "132", description: "Diameter of the lens in pixels." },
      },
    },
  ],
};
