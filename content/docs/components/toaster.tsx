import type { ComponentDoc } from "@/lib/docs/types";

import { ToasterDemo } from "@/registry/vitrum/demos/toaster-demo";

export const toasterDoc: ComponentDoc = {
  slug: "toaster",
  title: "Toast",
  description: "Notification slabs with a raised tint so stacked toasts never blur each other. Mount the Toaster once; call toast() from anywhere.",
  registryItem: "toaster",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/toaster-demo.tsx", component: ToasterDemo },
  ],
  api: [
    {
      exportName: "Toaster",
      props: {
        "position": { type: "Position", default: "\"bottom-right\"", description: "Corner the stack grows from." },
        "visibleToasts": { type: "number", default: "3", description: "Maximum simultaneously visible." },
      },
    },
  ],
};
