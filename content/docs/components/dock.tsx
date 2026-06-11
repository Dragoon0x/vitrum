import type { ComponentDoc } from "@/lib/docs/types";

import { DockDemo } from "@/registry/vitrum/demos/dock-demo";

export const dockDoc: ComponentDoc = {
  slug: "dock",
  title: "Dock",
  description: "A shelf of glass whose icons swell toward the pointer with sprung falloff. Keyboard focus magnifies too; reduced motion keeps the shelf flat.",
  registryItem: "dock",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/dock-demo.tsx", component: DockDemo },
  ],
  api: [
    {
      exportName: "DockItem",
      props: {
        "label": { type: "string", description: "Accessible name (required)." },
      },
    },
  ],
};
