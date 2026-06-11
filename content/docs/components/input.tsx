import type { ComponentDoc } from "@/lib/docs/types";

import { InputDemo } from "@/registry/vitrum/demos/input-demo";

export const inputDoc: ComponentDoc = {
  slug: "input",
  title: "Input",
  description: "Fields are recessed, not raised \u2014 a well sunk into the surface, shaded at its top edge where the light falls.",
  registryItem: "input",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/input-demo.tsx", component: InputDemo },
  ],
  api: [
    {
      exportName: "Input",
      props: {
        "type": { type: "string", default: "\"text\"", description: "Any native input type." },
      },
    },
  ],
};
