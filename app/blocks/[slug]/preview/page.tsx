import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOCKS, getBlock } from "@/content/blocks";
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
  return {
    title: `${block.title} preview`,
    robots: { index: false },
  };
}

export default async function BlockPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const block = getBlock(slug);
  if (!block) notFound();
  const Block = block.component;

  return (
    <main className="relative grid min-h-svh place-items-center overflow-clip p-6">
      <AuroraField className="fixed inset-0 -z-10" />
      <Block />
    </main>
  );
}
