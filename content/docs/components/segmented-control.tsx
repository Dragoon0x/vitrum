import type { ComponentDoc } from "@/lib/docs/types";

import { SegmentedControlDemo } from "@/registry/vitrum/demos/segmented-control-demo";

export const segmentedControlDoc: ComponentDoc = {
  slug: "segmented-control",
  title: "Segmented Control",
  description: "Equal segments in a recessed track, selected by a pane of glass that slides beneath the labels and refracts them as it passes.",
  registryItem: "segmented-control",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/segmented-control-demo.tsx", component: SegmentedControlDemo },
  ],
  api: [
    {
      exportName: "SegmentedControl",
      props: {
        "options": { type: "{ value, label, disabled? }[]", description: "The segments, in order." },
        "value": { type: "string", description: "Controlled selection." },
        "defaultValue": { type: "string", default: "first option", description: "Uncontrolled initial selection." },
        "onValueChange": { type: "(value: string) => void", description: "Selection callback." },
        "size": { type: "\"sm\" | \"default\"", default: "\"default\"", description: "Track height." },
      },
    },
  ],
};
