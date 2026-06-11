import type { ComponentDoc } from "@/lib/docs/types";

import { CommandDemo } from "@/registry/vitrum/demos/command-demo";

export const commandDoc: ComponentDoc = {
  slug: "command",
  title: "Command",
  description: "A keyboard-first command palette. Use it inline or as a \u2318K dialog.",
  registryItem: "command",
  demos: [
    { id: "inline", title: "Inline", file: "registry/vitrum/demos/command-demo.tsx", component: CommandDemo, tall: true },
  ],
  api: [
    {
      exportName: "CommandDialog",
      props: {
        "title": { type: "string", default: "\"Command palette\"", description: "Accessible dialog title." },
        "description": { type: "string", description: "Accessible dialog description." },
      },
    },
  ],
};
