import type { ComponentDoc } from "@/lib/docs/types";

import { CheckboxDemo } from "@/registry/vitrum/demos/checkbox-demo";

export const checkboxDoc: ComponentDoc = {
  slug: "checkbox",
  title: "Checkbox",
  description: "A recessed well that fills with light when checked.",
  registryItem: "checkbox",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/checkbox-demo.tsx", component: CheckboxDemo },
  ],
  api: [
    {
      exportName: "Checkbox",
      props: {
        "checked": { type: "boolean | \"indeterminate\"", description: "Controlled state." },
        "defaultChecked": { type: "boolean", default: "false", description: "Uncontrolled initial state." },
        "onCheckedChange": { type: "(checked) => void", description: "Change callback." },
      },
    },
  ],
};
