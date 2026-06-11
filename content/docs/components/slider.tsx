import type { ComponentDoc } from "@/lib/docs/types";

import { SliderDemo } from "@/registry/vitrum/demos/slider-demo";

export const sliderDoc: ComponentDoc = {
  slug: "slider",
  title: "Slider",
  description: "Value selection with glass thumbs that swell into magnifying capsules while held — the track bends through them — then spring back on release. Multiple values render multiple thumbs.",
  registryItem: "slider",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/slider-demo.tsx", component: SliderDemo },
  ],
  api: [
    {
      exportName: "Slider",
      props: {
        "value": { type: "number[]", description: "Controlled values; one thumb per entry." },
        "defaultValue": { type: "number[]", default: "[min]", description: "Uncontrolled initial values." },
        "min": { type: "number", default: "0", description: "Lower bound." },
        "max": { type: "number", default: "100", description: "Upper bound." },
        "step": { type: "number", default: "1", description: "Increment." },
      },
    },
  ],
};
