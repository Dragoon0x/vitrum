import { getAllDocsLinks } from "@/content/nav";
import { getAllRegistryItems } from "@/lib/docs/registry-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  const docs = getAllDocsLinks()
    .map(
      (link) =>
        `- [${link.title}](${absoluteUrl(link.href)})${link.description ? `: ${link.description}` : ""}`,
    )
    .join("\n");

  const items = getAllRegistryItems()
    .map(
      (item) =>
        `- [${item.title ?? item.name}](${absoluteUrl(`/r/${item.name}.json`)})${item.description ? `: ${item.description}` : ""}`,
    )
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Components install via the shadcn CLI: \`npx shadcn@latest add ${absoluteUrl("/r/button.json")}\`
Namespace form: add \`"registries": { "@vitrum": "${siteConfig.url}/r/{name}.json" }\` to components.json, then \`shadcn add @vitrum/button\`.

## Documentation

${docs}

## Registry items (JSON)

${items}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
