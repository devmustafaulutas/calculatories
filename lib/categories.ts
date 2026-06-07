import { categories } from "@/data/categories";
import type { Category } from "@/data/schemas/category";

export type { Category };

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategory(idOrSlug: string): Category | undefined {
  return categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
