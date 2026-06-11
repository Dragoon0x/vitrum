import type { ComponentDoc } from "@/lib/docs/types";

import { TooltipDemo } from "@/registry/vitrum/demos/tooltip-demo";

export const tooltipDoc: ComponentDoc = {
  slug: "tooltip",
  title: "Tooltip",
  description: "A film of glass naming whatever the pointer rests on.",
  registryItem: "tooltip",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/tooltip-demo.tsx", component: TooltipDemo },
  ],
  api: [
    {
      exportName: "TooltipContent",
      props: {
        "sideOffset": { type: "number", default: "6", description: "Gap from the trigger, px." },
      },
    },
  ],
};
