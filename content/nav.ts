/**
 * Single navigation source: feeds the docs sidebar, the command-palette
 * search index, the sitemap, and llms.txt. Hrefs are typed routes, so a
 * broken link is a compile error.
 */

import type { Route } from "next";

export interface NavLink {
  title: string;
  href: Route;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export const GETTING_STARTED: NavGroup = {
  title: "Getting started",
  links: [
    { title: "Introduction", href: "/docs", description: "What Vitrum is and how the material thinks." },
    { title: "Installation", href: "/docs/installation", description: "Add Vitrum to a project in two commands." },
    { title: "Material & theming", href: "/docs/material", description: "Engines, materials, tints, and every token." },
    { title: "Accessibility", href: "/docs/accessibility", description: "Focus, contrast, and motion commitments." },
    { title: "Browser support", href: "/docs/browser-support", description: "Exactly what renders where, and why." },
    { title: "Use with AI", href: "/docs/mcp", description: "Wire the registry into AI editors." },
  ],
};

export const COMPONENT_GROUPS: NavGroup[] = [
  {
    title: "Foundation",
    links: [
      { title: "Glass", href: "/docs/components/glass" },
      { title: "Aurora Field", href: "/docs/components/aurora-field" },
      { title: "Lens", href: "/docs/components/lens" },
    ],
  },
  {
    title: "Actions",
    links: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Segmented Control", href: "/docs/components/segmented-control" },
    ],
  },
  {
    title: "Inputs",
    links: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Slider", href: "/docs/components/slider" },
    ],
  },
  {
    title: "Display",
    links: [
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Gauge", href: "/docs/components/gauge" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
    ],
  },
  {
    title: "Overlay",
    links: [
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Toast", href: "/docs/components/toaster" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { title: "Navbar", href: "/docs/components/navbar" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Dock", href: "/docs/components/dock" },
    ],
  },
];

export const DOCS_NAV: NavGroup[] = [GETTING_STARTED, ...COMPONENT_GROUPS];

export const SITE_LINKS: NavLink[] = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components/glass" },
  { title: "Blocks", href: "/blocks" },
  { title: "Studio", href: "/studio" },
];

export function getAllDocsLinks(): NavLink[] {
  return DOCS_NAV.flatMap((group) => group.links);
}
