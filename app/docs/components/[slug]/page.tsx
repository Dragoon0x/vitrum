import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { docsMap } from "@/content/docs/components";

import { DemoFrame } from "@/components/docs/demo-frame";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PageHeader } from "@/components/docs/page-header";
import { PropsTable } from "@/components/docs/props-table";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(docsMap).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docsMap[slug];
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docsMap[slug];
  if (!doc) notFound();

  return (
    <article className="flex flex-col gap-10">
      <PageHeader title={doc.title} description={doc.description} />

      <section aria-label="Install" className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Install
        </h2>
        <InstallTabs item={doc.registryItem} />
      </section>

      <section aria-label="Examples" className="flex flex-col gap-8">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Examples
        </h2>
        {doc.demos.map((demo) => (
          <DemoFrame key={demo.id} demo={demo} />
        ))}
      </section>

      {doc.api.length > 0 ? (
        <section aria-label="API" className="flex flex-col gap-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            API
          </h2>
          {doc.api.map((api) => (
            <PropsTable key={api.exportName} api={api} />
          ))}
        </section>
      ) : null}
    </article>
  );
}
