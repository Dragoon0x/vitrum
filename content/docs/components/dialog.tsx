import type { ComponentDoc } from "@/lib/docs/types";

import { DialogDemo } from "@/registry/vitrum/demos/dialog-demo";

export const dialogDoc: ComponentDoc = {
  slug: "dialog",
  title: "Dialog",
  description: "A modal veil centered over a frosted scrim. Focus is trapped, Escape closes, and focus returns to the trigger.",
  registryItem: "dialog",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/dialog-demo.tsx", component: DialogDemo, tall: true },
  ],
  api: [
    {
      exportName: "DialogContent",
      props: {
        "showCloseButton": { type: "boolean", default: "true", description: "Render the corner close button." },
      },
    },
  ],
};
