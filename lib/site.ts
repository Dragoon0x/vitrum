export const siteConfig = {
  name: "Vitrum",
  tagline: "Designed in glass.",
  description:
    "A component library cast in liquid glass — refractive, luminous surfaces for React, with a frost fallback everywhere else.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitrum.dev",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function registryItemUrl(name: string): string {
  return absoluteUrl(`/r/${name}.json`);
}

export function installCommand(name: string): string {
  return `npx shadcn@latest add ${registryItemUrl(name)}`;
}
