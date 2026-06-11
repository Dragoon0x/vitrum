import type { DemoDef } from "@/lib/docs/types";

import { CodeBlock } from "@/components/docs/code-block";
import { DemoTabs } from "@/components/docs/demo-tabs";

/**
 * One demo section: heading, live preview, and the demo's own source —
 * the same file that is executing, so the code can never drift.
 */
export function DemoFrame({ demo }: { demo: DemoDef }) {
  const Demo = demo.component;

  return (
    <section
      id={demo.id}
      aria-label={demo.title}
      className="flex scroll-mt-24 flex-col gap-3"
    >
      <h3 className="font-display text-base font-semibold tracking-tight">
        {demo.title}
      </h3>
      <DemoTabs
        tall={demo.tall}
        preview={<Demo />}
        code={<CodeBlock file={demo.file} collapsible />}
      />
    </section>
  );
}
