import type { ComponentDoc } from "@/lib/docs/types";

import { SkeletonDemo } from "@/registry/vitrum/demos/skeleton-demo";

export const skeletonDoc: ComponentDoc = {
  slug: "skeleton",
  title: "Skeleton",
  description: "A loading placeholder swept by a specular highlight, the way light glides across tilted glass.",
  registryItem: "skeleton",
  demos: [
    { id: "default", title: "Default", file: "registry/vitrum/demos/skeleton-demo.tsx", component: SkeletonDemo },
  ],
  api: [
    {
      exportName: "Skeleton",
      props: {

      },
    },
  ],
};
