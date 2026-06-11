import type { ComponentDoc } from "@/lib/docs/types";

import { AlertDemo } from "@/registry/vitrum/demos/alert-demo";

export const alertDoc: ComponentDoc = {
  slug: "alert",
  title: "Alert",
  description: "An inline pane of tinted glass for callouts and statuses. The destructive variant announces itself assertively to screen readers.",
  registryItem: "alert",
  demos: [
    { id: "variants", title: "Variants", file: "registry/vitrum/demos/alert-demo.tsx", component: AlertDemo },
  ],
  api: [
    {
      exportName: "Alert",
      props: {
        "variant": { type: "\"neutral\" | \"accent\" | \"success\" | \"warning\" | \"destructive\"", default: "\"neutral\"", description: "Tint and icon color." },
      },
    },
  ],
};
