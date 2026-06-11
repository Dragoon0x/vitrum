import type { ComponentDoc } from "@/lib/docs/types";

import { CardDemo } from "@/registry/vitrum/demos/card-demo";

export const cardDoc: ComponentDoc = {
  slug: "card",
  title: "Card",
  description: "A slab of glass with header, content, and footer anatomy. Glass nested inside it automatically laminates \u2014 tint and ring without double blur.",
  registryItem: "card",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/card-demo.tsx", component: CardDemo },
  ],
  api: [
    {
      exportName: "Card",
      props: {

      },
    },
  ],
};
