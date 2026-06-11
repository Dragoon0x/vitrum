import type { ComponentDoc } from "@/lib/docs/types";

import { NavbarDemo } from "@/registry/vitrum/demos/navbar-demo";

export const navbarDoc: ComponentDoc = {
  slug: "navbar",
  title: "Navbar",
  description: "A floating bar of glass that condenses as the page scrolls \u2014 the tint deepens instead of going opaque.",
  registryItem: "navbar",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/navbar-demo.tsx", component: NavbarDemo },
  ],
  api: [
    {
      exportName: "Navbar",
      props: {
        "position": { type: "\"fixed\" | \"static\"", default: "\"fixed\"", description: "Fixed floats over the page and reacts to scroll." },
      },
    },
    {
      exportName: "NavbarLink",
      props: {
        "active": { type: "boolean", default: "false", description: "Highlight as the current page." },
        "asChild": { type: "boolean", default: "false", description: "Compose with a router Link." },
      },
    },
  ],
};
