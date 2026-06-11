import type { ComponentDoc } from "@/lib/docs/types";

import { ButtonDemo } from "@/registry/vitrum/demos/button-demo";
import { ButtonSizesDemo } from "@/registry/vitrum/demos/button-sizes-demo";

export const buttonDoc: ComponentDoc = {
  slug: "button",
  title: "Button",
  description: "A pill of glass. The accent variant is colored glass rather than flat paint, and every variant carries the pointer sheen.",
  registryItem: "button",
  demos: [
    { id: "variants", title: "Variants", file: "registry/vitrum/demos/button-demo.tsx", component: ButtonDemo },
    { id: "sizes", title: "Sizes", file: "registry/vitrum/demos/button-sizes-demo.tsx", component: ButtonSizesDemo },
  ],
  api: [
    {
      exportName: "Button",
      props: {
        "variant": { type: "\"glass\" | \"accent\" | \"film\" | \"destructive\" | \"ghost\" | \"link\"", default: "\"glass\"", description: "Visual treatment." },
        "size": { type: "\"sm\" | \"default\" | \"lg\" | \"icon\" | \"icon-sm\" | \"icon-lg\"", default: "\"default\"", description: "Control height and padding." },
        "asChild": { type: "boolean", default: "false", description: "Render the child element with button styling." },
      },
    },
  ],
};
