import type { ComponentDoc } from "@/lib/docs/types";

import { BadgeDemo } from "@/registry/vitrum/demos/badge-demo";

export const badgeDoc: ComponentDoc = {
  slug: "badge",
  title: "Badge",
  description: "A sliver of film glass for labels and counts; semantic variants are tinted glass, not paint.",
  registryItem: "badge",
  demos: [
    { id: "variants", title: "Variants", file: "registry/vitrum/demos/badge-demo.tsx", component: BadgeDemo },
  ],
  api: [
    {
      exportName: "Badge",
      props: {
        "variant": { type: "\"neutral\" | \"accent\" | \"success\" | \"warning\" | \"destructive\" | \"outline\"", default: "\"neutral\"", description: "Visual treatment." },
        "asChild": { type: "boolean", default: "false", description: "Render the child element with badge styling." },
      },
    },
  ],
};
