import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHeader } from "@/components/docs/page-header";
import { Studio } from "@/components/studio/studio";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";

export const metadata: Metadata = {
  title: "Material Studio",
  description:
    "Tune the glass — frost, tint, refraction, radius — over switchable scenes, then export the result as CSS or component props.",
};

export default function StudioPage() {
  return (
    <div className="relative min-h-svh">
      <AuroraField className="fixed inset-0 -z-10 opacity-50" />
      <SiteHeader />
      <main
        id="content"
        className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pt-28 pb-16"
      >
        <PageHeader
          title="Material Studio"
          description="Every knob of the material, live. Tune a surface over different light, then take it home as CSS variables or component props."
        />
        <Studio />
      </main>
      <SiteFooter />
    </div>
  );
}
