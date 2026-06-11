import type { ComponentDoc } from "@/lib/docs/types";

import { SheetDemo } from "@/registry/vitrum/demos/sheet-demo";

export const sheetDoc: ComponentDoc = {
  slug: "sheet",
  title: "Sheet",
  description: "An edge-anchored veil for secondary surfaces \u2014 filters, settings, navigation.",
  registryItem: "sheet",
  demos: [
    { id: "sides", title: "Sides", file: "registry/vitrum/demos/sheet-demo.tsx", component: SheetDemo, tall: true },
  ],
  api: [
    {
      exportName: "SheetContent",
      props: {
        "side": { type: "\"right\" | \"left\" | \"top\" | \"bottom\"", default: "\"right\"", description: "Edge the sheet enters from." },
      },
    },
  ],
};
