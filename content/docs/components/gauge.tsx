import type { ComponentDoc } from "@/lib/docs/types";

import { GaugeDemo } from "@/registry/vitrum/demos/gauge-demo";

export const gaugeDoc: ComponentDoc = {
  slug: "gauge",
  title: "Gauge",
  description: "A vessel of glass holding liquid light. The fill rises on a transform and carries a bright meniscus where it meets the surface.",
  registryItem: "gauge",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/gauge-demo.tsx", component: GaugeDemo },
  ],
  api: [
    {
      exportName: "Gauge",
      props: {
        "value": { type: "number", description: "Current reading." },
        "min": { type: "number", default: "0", description: "Lower bound." },
        "max": { type: "number", default: "100", description: "Upper bound." },
        "label": { type: "string", description: "Accessible name (required)." },
        "format": { type: "(value, pct) => ReactNode", default: "percentage", description: "Custom readout." },
      },
    },
  ],
};
