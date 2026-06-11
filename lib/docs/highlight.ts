import "server-only";

import { createHighlighter, type Highlighter } from "shiki";

const LANGS = ["tsx", "ts", "css", "bash", "json"] as const;

export type CodeLang = (typeof LANGS)[number];

declare global {
  // survive module re-evaluation in dev
  var __vitrumHighlighter: Promise<Highlighter> | undefined;
}

function getHighlighter(): Promise<Highlighter> {
  globalThis.__vitrumHighlighter ??= createHighlighter({
    themes: ["min-light", "poimandres"],
    langs: [...LANGS],
  });
  return globalThis.__vitrumHighlighter;
}

export async function highlight(
  code: string,
  lang: CodeLang = "tsx",
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "min-light", dark: "poimandres" },
    defaultColor: false,
  });
}
