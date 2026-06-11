import type { ComponentDoc } from "@/lib/docs/types";

import { DropdownMenuDemo } from "@/registry/vitrum/demos/dropdown-menu-demo";

export const dropdownMenuDoc: ComponentDoc = {
  slug: "dropdown-menu",
  title: "Dropdown Menu",
  description: "Menus with groups, checkboxes, radio items, and submenus \u2014 all in veiled glass.",
  registryItem: "dropdown-menu",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/dropdown-menu-demo.tsx", component: DropdownMenuDemo, tall: true },
  ],
  api: [
    {
      exportName: "DropdownMenuItem",
      props: {
        "inset": { type: "boolean", default: "false", description: "Indent to align with checkable items." },
        "variant": { type: "\"default\" | \"destructive\"", default: "\"default\"", description: "Destructive items read in red." },
      },
    },
  ],
};
