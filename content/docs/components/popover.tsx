import type { ComponentDoc } from "@/lib/docs/types";

import { PopoverDemo } from "@/registry/vitrum/demos/popover-demo";

export const popoverDoc: ComponentDoc = {
  slug: "popover",
  title: "Popover",
  description: "Anchored content in a floating veil of glass.",
  registryItem: "popover",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/popover-demo.tsx", component: PopoverDemo, tall: true },
  ],
  api: [
    {
      exportName: "PopoverContent",
      props: {
        "align": { type: "\"start\" | \"center\" | \"end\"", default: "\"center\"", description: "Alignment against the trigger." },
        "sideOffset": { type: "number", default: "6", description: "Gap from the trigger, px." },
      },
    },
  ],
};
