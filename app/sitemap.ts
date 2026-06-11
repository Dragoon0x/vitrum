import type { MetadataRoute } from "next";

import { getAllDocsLinks } from "@/content/nav";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/blocks", "/studio"];
  const docs = getAllDocsLinks().map((link) => link.href);

  return [...staticRoutes, ...docs].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
