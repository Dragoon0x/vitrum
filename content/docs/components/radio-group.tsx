import type { ComponentDoc } from "@/lib/docs/types";

import { RadioGroupDemo } from "@/registry/vitrum/demos/radio-group-demo";

export const radioGroupDoc: ComponentDoc = {
  slug: "radio-group",
  title: "Radio Group",
  description: "Exclusive choices with roving keyboard focus.",
  registryItem: "radio-group",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/radio-group-demo.tsx", component: RadioGroupDemo },
  ],
  api: [
    {
      exportName: "RadioGroup",
      props: {
        "value": { type: "string", description: "Controlled selection." },
        "defaultValue": { type: "string", description: "Uncontrolled initial selection." },
        "onValueChange": { type: "(value: string) => void", description: "Selection callback." },
      },
    },
  ],
};
