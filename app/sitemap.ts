import { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/categories";
import { getAllBlogUrls } from "@/lib/blog";
import { getAllProgrammaticUrls } from "@/lib/locations";
import { SITE_URL } from "@/lib/site-config";
import { getAllToolUrls } from "@/lib/tools";
import { canonicalUrl, categoryPath } from "@/lib/urls";

export async function generateSitemaps() {
  return [
    { id: "static" },
    { id: "categories" },
    { id: "tools" },
    { id: "blog" },
    { id: "programmatic" },
  ];
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const resolvedId = await id;
  switch (resolvedId) {
    case "static":
      return [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: canonicalUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: canonicalUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: canonicalUrl("/editorial-policy"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: canonicalUrl("/methodology"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: canonicalUrl("/privacy-policy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: canonicalUrl("/terms"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: canonicalUrl("/blog"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
      ];
    case "categories":
      return getAllCategories().map((cat) => ({
        url: canonicalUrl(categoryPath(cat.slug)),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    case "tools":
      return getAllToolUrls().map((entry) => ({
        url: canonicalUrl(entry.url),
        lastModified: new Date(entry.lastModified),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }));
    case "blog": {
      const posts = await getAllBlogUrls();
      return posts.map((entry) => ({
        url: canonicalUrl(entry.url),
        lastModified: new Date(entry.lastModified),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
    case "programmatic":
      return getAllProgrammaticUrls().map((entry) => ({
        url: canonicalUrl(entry.url),
        lastModified: new Date(entry.lastModified),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    default:
      return [];
  }
}
