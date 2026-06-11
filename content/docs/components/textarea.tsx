import type { ComponentDoc } from "@/lib/docs/types";

import { TextareaDemo } from "@/registry/vitrum/demos/textarea-demo";

export const textareaDoc: ComponentDoc = {
  slug: "textarea",
  title: "Textarea",
  description: "A multiline well that grows with its content.",
  registryItem: "textarea",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/textarea-demo.tsx", component: TextareaDemo },
  ],
  api: [
    {
      exportName: "Textarea",
      props: {

      },
    },
  ],
};
