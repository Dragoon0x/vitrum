import type { ComponentDoc } from "@/lib/docs/types";

import { SwitchDemo } from "@/registry/vitrum/demos/switch-demo";

export const switchDoc: ComponentDoc = {
  slug: "switch",
  title: "Switch",
  description: "A disc of glass riding a recessed track. Held down — pointer or Space — it swells into a magnifying capsule that refracts the track, then springs into place.",
  registryItem: "switch",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/switch-demo.tsx", component: SwitchDemo },
  ],
  api: [
    {
      exportName: "Switch",
      props: {
        "checked": { type: "boolean", description: "Controlled state." },
        "defaultChecked": { type: "boolean", default: "false", description: "Uncontrolled initial state." },
        "onCheckedChange": { type: "(checked: boolean) => void", description: "Change callback." },
      },
    },
  ],
};
