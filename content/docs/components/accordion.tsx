import type { ComponentDoc } from "@/lib/docs/types";

import { AccordionDemo } from "@/registry/vitrum/demos/accordion-demo";

export const accordionDoc: ComponentDoc = {
  slug: "accordion",
  title: "Accordion",
  description: "Vertically collapsing sections with sprung reveals.",
  registryItem: "accordion",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/accordion-demo.tsx", component: AccordionDemo },
  ],
  api: [
    {
      exportName: "Accordion",
      props: {
        "type": { type: "\"single\" | \"multiple\"", description: "Whether one or many items can open." },
        "collapsible": { type: "boolean", default: "false", description: "Allow closing the open item (single mode)." },
        "defaultValue": { type: "string | string[]", description: "Initially open item(s)." },
      },
    },
  ],
};
