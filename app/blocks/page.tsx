import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRightIcon } from "lucide-react";

import { BLOCKS } from "@/content/blocks";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHeader } from "@/components/docs/page-header";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Composed sections built from Vitrum components — install any of them with one command.",
};

export default function BlocksPage() {
  return (
    <div className="relative min-h-svh">
      <AuroraField className="fixed inset-0 -z-10 opacity-70" />
      <SiteHeader />
      <main id="content" className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <PageHeader
          title="Blocks"
          description="Whole sections, pre-composed. Every block is one file plus its component dependencies — installed, it's all yours to reshape."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {BLOCKS.map((block) => {
            const Block = block.component;
            return (
              <section
                key={block.slug}
                aria-label={block.title}
                className="group flex flex-col gap-4"
              >
                <div className="vt-demo-scene relative flex min-h-120 items-center justify-center overflow-clip rounded-sheet border border-border p-6">
                  <div className="w-full origin-center scale-90">
                    <div className="flex justify-center">
                      <Block />
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 px-1">
                  <div>
                    <h2 className="font-display text-base font-semibold tracking-tight">
                      {block.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                  <Link
                    href={`/blocks/${block.slug}` as Route}
                    className="vt-ring mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-sm font-medium text-glint transition-colors hover:bg-accent/60"
                  >
                    Open <ArrowRightIcon className="size-3.5" />
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
