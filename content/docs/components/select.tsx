import type { ComponentDoc } from "@/lib/docs/types";

import { SelectDemo } from "@/registry/vitrum/demos/select-demo";

export const selectDoc: ComponentDoc = {
  slug: "select",
  title: "Select",
  description: "A native-feeling listbox in a veil of glass, fully keyboard-driven.",
  registryItem: "select",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/select-demo.tsx", component: SelectDemo, tall: true },
  ],
  api: [
    {
      exportName: "SelectTrigger",
      props: {
        "size": { type: "\"sm\" | \"default\"", default: "\"default\"", description: "Trigger height." },
      },
    },
  ],
};
