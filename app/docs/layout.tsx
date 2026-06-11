import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DocsSidebar } from "@/components/site/docs-sidebar";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-svh">
      <AuroraField className="fixed inset-0 -z-10 opacity-60" />
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-6 pt-24">
        <aside className="sticky top-24 hidden h-[calc(100svh-7rem)] w-60 shrink-0 overflow-y-auto md:block">
          <DocsSidebar />
        </aside>
        <main id="content" className="min-w-0 flex-1 pb-16">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
