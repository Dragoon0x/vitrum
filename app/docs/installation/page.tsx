import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";

export const metadata: Metadata = {
  title: "Installation",
  description: "Add Vitrum to a project in two commands.",
};

const LAYOUT_SNIPPET = `import { GlassRoot } from "@/components/ui/glass-root";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlassRoot />
        {children}
      </body>
    </html>
  );
}`;

export default function InstallationPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Installation"
        description="Vitrum distributes through the shadcn CLI: components land as source files in your project, with the material system arriving automatically alongside the first one."
      />

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          1. Start from a Tailwind v4 project
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Any React framework the shadcn CLI supports works. If you are
          starting fresh:
        </p>
        <CodeBlock
          lang="bash"
          code={`pnpm create next-app@latest my-app --ts --tailwind --app\ncd my-app\npnpm dlx shadcn@latest init`}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          2. Add a component
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Install any component by URL. Its dependencies — the theme
          stylesheet, the glass primitive, behavioral packages — resolve
          transitively.
        </p>
        <CodeBlock
          lang="bash"
          code={`pnpm dlx shadcn@latest add ${siteConfig.url}/r/button.json`}
        />
        <Callout kind="info">
          Prefer a namespace? Add{" "}
          <code>
            {`"registries": { "@vitrum": "${siteConfig.url}/r/{name}.json" }`}
          </code>{" "}
          to your <code>components.json</code>, then{" "}
          <code>shadcn add @vitrum/button</code>.
        </Callout>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          3. Import the stylesheet
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The theme lands at <code className="font-mono">vitrum.css</code> in
          your project root. Import it once in your global CSS, after
          Tailwind:
        </p>
        <CodeBlock
          lang="css"
          code={`@import "tailwindcss";\n@import "../vitrum.css";`}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          4. Enable refraction
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Render <code className="font-mono">{"<GlassRoot/>"}</code> once at
          the top of <code className="font-mono">{"<body>"}</code>. It
          resolves the rendering engine before first paint and mounts the
          shared refraction filters. Skip it and every surface renders in
          the frost engine — fully styled, no refraction.
        </p>
        <CodeBlock lang="tsx" code={LAYOUT_SNIPPET} label="app/layout.tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Requirements
        </h2>
        <ul className="flex max-w-2xl list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Tailwind CSS v4 — the material tokens use its theme layer.</li>
          <li>React 19 or later.</li>
          <li>
            Dark mode via a <code className="font-mono">.dark</code> class
            (the shadcn init default).
          </li>
        </ul>
      </section>
    </article>
  );
}
