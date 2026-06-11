import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";

import { BLOCKS, getBlock } from "@/content/blocks";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHeader } from "@/components/docs/page-header";
import { InstallTabs } from "@/components/docs/install-tabs";
import { CodeBlock } from "@/components/docs/code-block";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOCKS.map((block) => ({ slug: block.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const block = getBlock(slug);
  if (!block) return {};
  return { title: `${block.title} block`, description: block.description };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const block = getBlock(slug);
  if (!block) notFound();
  const Block = block.component;

  return (
    <div className="relative min-h-svh">
      <AuroraField className="fixed inset-0 -z-10 opacity-70" />
      <SiteHeader />
      <main
        id="content"
        className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pt-28 pb-16"
      >
        <PageHeader title={block.title} description={block.description}>
          <Link
            href={`/blocks/${block.slug}/preview` as Route}
            target="_blank"
            className="vt-ring inline-flex w-fit items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-sm text-glint transition-colors hover:bg-accent/60"
          >
            Open standalone preview <ExternalLinkIcon className="size-3.5" />
          </Link>
        </PageHeader>

        <div className="vt-demo-scene flex items-center justify-center overflow-clip rounded-sheet border border-border px-6 py-14">
          <Block />
        </div>

        <section aria-label="Install" className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Install
          </h2>
          <InstallTabs item={block.registryItem} />
        </section>

        <section aria-label="Source" className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Source
          </h2>
          <CodeBlock
            file={block.file}
            label={`${block.slug}.tsx`}
            collapsible
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
