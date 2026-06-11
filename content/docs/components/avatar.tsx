import type { ComponentDoc } from "@/lib/docs/types";

import { AvatarDemo } from "@/registry/vitrum/demos/avatar-demo";

export const avatarDoc: ComponentDoc = {
  slug: "avatar",
  title: "Avatar",
  description: "An identity disc with a glass rim; the fallback is a film of glass with initials.",
  registryItem: "avatar",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/avatar-demo.tsx", component: AvatarDemo },
  ],
  api: [
    {
      exportName: "AvatarImage",
      props: {
        "src": { type: "string", description: "Image source." },
        "alt": { type: "string", description: "Accessible description." },
      },
    },
  ],
};
