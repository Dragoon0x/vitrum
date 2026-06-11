import { highlight, type CodeLang } from "@/lib/docs/highlight";
import { getDisplaySource } from "@/lib/docs/source";
import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/docs/copy-button";

interface CodeBlockProps {
  /** Inline code to render… */
  code?: string;
  /** …or a repo-relative file to read, transform, and render. */
  file?: string;
  lang?: CodeLang;
  /** Filename chip shown in the header. */
  label?: string;
  className?: string;
  collapsible?: boolean;
}

export async function CodeBlock({
  code,
  file,
  lang = "tsx",
  label,
  className,
  collapsible = false,
}: CodeBlockProps) {
  const source = code ?? (file ? await getDisplaySource(file) : "");
  const html = await highlight(source, lang);

  return (
    <figure
      data-slot="code-block"
      className={cn(
        "group relative overflow-hidden rounded-pane border border-border bg-surface-recessed/60",
        className,
      )}
    >
      {label ? (
        <figcaption className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {label}
          </span>
          <CopyButton value={source} />
        </figcaption>
      ) : (
        <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <CopyButton value={source} />
        </div>
      )}
      <div
        className={cn(
          "overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed [&_pre]:outline-none",
          collapsible && "max-h-80 overflow-y-auto",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
