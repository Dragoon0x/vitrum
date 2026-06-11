import { getRegistryItem } from "@/lib/docs/registry-data";

import { CodeBlock } from "@/components/docs/code-block";

/**
 * Renders the actual source of every file in a registry item, with import
 * paths rewritten exactly as the CLI rewrites them on install.
 */
export function ComponentSource({ item }: { item: string }) {
  const data = getRegistryItem(item);

  return (
    <div className="flex flex-col gap-4">
      {(data.files ?? []).map((file) => {
        const filename = file.path.split("/").slice(-1)[0];
        const lang = file.path.endsWith(".css") ? "css" : "tsx";
        return (
          <CodeBlock
            key={file.path}
            file={file.path}
            lang={lang}
            label={filename}
            collapsible
          />
        );
      })}
    </div>
  );
}
