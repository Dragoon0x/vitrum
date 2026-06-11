import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";

export const metadata: Metadata = {
  title: "Use with AI",
  description: "Wire the registry into AI editors.",
};

export default function McpPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Use with AI"
        description="The registry speaks the same protocol AI coding agents already use to install components — point your editor at it once and ask for glass in plain language."
      />

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          1. Register the namespace
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Add Vitrum to <code className="font-mono">components.json</code>:
        </p>
        <CodeBlock
          lang="json"
          code={`{\n  "registries": {\n    "@vitrum": "${siteConfig.url}/r/{name}.json"\n  }\n}`}
          label="components.json"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          2. Connect your editor
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The shadcn CLI ships an MCP server that exposes any configured
          registry to AI clients:
        </p>
        <CodeBlock lang="bash" code={`pnpm dlx shadcn@latest mcp init`} />
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Pick your client when prompted — the command writes the right
          configuration for it.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          3. Ask for glass
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          With the namespace registered, prompts resolve against this
          registry:
        </p>
        <CodeBlock
          lang="bash"
          code={`"Add @vitrum/dialog and @vitrum/toaster to this project"\n"Build a settings page using @vitrum components"\n"Install the vitrum gauge and wire it to the upload progress"`}
        />
        <Callout kind="tip">
          Agents reading this site directly can use{" "}
          <code>{siteConfig.url}/llms.txt</code> — a plain-text index of
          every documentation page and registry item.
        </Callout>
      </section>
    </article>
  );
}
