import type { ComponentDoc } from "@/lib/docs/types";

import { AuroraFieldDemo } from "@/registry/vitrum/demos/aurora-field-demo";

export const auroraFieldDoc: ComponentDoc = {
  slug: "aurora-field",
  title: "Aurora Field",
  description: "Ambient light for glass to bend. Three blobs drift on co-prime cycles behind a noise tile \u2014 zero JavaScript, paused under reduced motion.",
  registryItem: "aurora-field",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/aurora-field-demo.tsx", component: AuroraFieldDemo },
  ],
  api: [
    {
      exportName: "AuroraField",
      props: {
        "className": { type: "string", description: "Position the field (defaults to absolute inset-0)." },
      },
    },
  ],
};
