import type { ComponentDoc } from "@/lib/docs/types";

import { TabsDemo } from "@/registry/vitrum/demos/tabs-demo";

export const tabsDoc: ComponentDoc = {
  slug: "tabs",
  title: "Tabs",
  description: "Sectioned content with an accent underline and arrow-key roving.",
  registryItem: "tabs",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/tabs-demo.tsx", component: TabsDemo },
  ],
  api: [
    {
      exportName: "Tabs",
      props: {
        "defaultValue": { type: "string", description: "Initially active tab." },
        "value": { type: "string", description: "Controlled active tab." },
        "onValueChange": { type: "(value: string) => void", description: "Activation callback." },
      },
    },
  ],
};
