import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import type { Tool } from "@/data/schemas/tool";
import { toolPath } from "@/lib/urls";

export type { Tool };

export function getAllTools(): Tool[] {
  return tools;
}

export function getLiveTools(): Tool[] {
  return tools.filter((t) => t.status === "live");
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolByCategoryAndSlug(
  categorySlug: string,
  slug: string,
): Tool | undefined {
  return tools.find((t) => t.category === categorySlug && t.slug === slug);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId);
}

export function getLiveToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId && t.status === "live");
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured && t.status === "live");
}

export function getRelatedTools(currentSlug: string, limit = 3): Tool[] {
  const current = getTool(currentSlug);
  if (!current) return getLiveTools().slice(0, limit);

  const related = current.relatedToolSlugs
    .map((slug) => getTool(slug))
    .filter((t): t is Tool => t !== undefined && t.status === "live");

  if (related.length >= limit) return related.slice(0, limit);

  const sameCategory = getLiveTools().filter(
    (t) => t.category === current.category && t.slug !== currentSlug,
  );
  const others = getLiveTools().filter(
    (t) => t.category !== current.category && t.slug !== currentSlug,
  );

  return [...related, ...sameCategory, ...others]
    .filter(
      (t, i, arr) => arr.findIndex((x) => x.slug === t.slug) === i,
    )
    .slice(0, limit);
}

export function getAllToolUrls(): { url: string; lastModified: string }[] {
  return getLiveTools().map((t) => ({
    url: toolPath(t.category, t.slug),
    lastModified: t.updatedAt,
  }));
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return getLiveTools().filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.primaryKeyword.toLowerCase().includes(q) ||
      categories
        .find((c) => c.id === t.category)
        ?.name.toLowerCase()
        .includes(q),
  );
}

export function getCategoryForTool(tool: Tool) {
  return categories.find((c) => c.id === tool.category);
}
