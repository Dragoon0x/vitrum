import type { ComponentDoc } from "@/lib/docs/types";

import { ProgressDemo } from "@/registry/vitrum/demos/progress-demo";

export const progressDoc: ComponentDoc = {
  slug: "progress",
  title: "Progress",
  description: "Liquid light measuring completion \u2014 a linear bar, a ring, and an indeterminate spinner.",
  registryItem: "progress",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/progress-demo.tsx", component: ProgressDemo },
  ],
  api: [
    {
      exportName: "Progress",
      props: {
        "value": { type: "number", default: "0", description: "Completion percentage (0\u2013100)." },
      },
    },
    {
      exportName: "ProgressRing",
      props: {
        "value": { type: "number", description: "Completion percentage (0\u2013100)." },
        "size": { type: "number", default: "48", description: "Outer diameter, px." },
        "thickness": { type: "number", default: "5", description: "Stroke width, px." },
      },
    },
  ],
};
