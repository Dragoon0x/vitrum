export const siteConfig = {
  name: "Vitrum",
  tagline: "Designed in glass.",
  description:
    "Interfaces cast in glass — refractive, luminous React components with a frost fallback everywhere else.",
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
