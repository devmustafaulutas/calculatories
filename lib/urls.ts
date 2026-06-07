import { SITE_URL } from "@/lib/site-config";

/** Normalize a path to start with / and never end with a trailing slash (except root). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "");
}

/** Build an absolute canonical URL with no trailing slash. */
export function canonicalUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

export function categoryPath(slug: string): string {
  return normalizePath(`/${slug}`);
}

export function toolPath(categorySlug: string, toolSlug: string): string {
  return normalizePath(`/${categorySlug}/${toolSlug}`);
}

export function locationPath(
  categorySlug: string,
  toolSlug: string,
  locationSlug: string,
): string {
  return normalizePath(`/${categorySlug}/${toolSlug}/${locationSlug}`);
}

export function blogPath(slug: string): string {
  return normalizePath(`/blog/${slug}`);
}

export function authorPath(slug: string): string {
  return normalizePath(`/authors/${slug}`);
}

export function blogCategoryPath(cat: string): string {
  return normalizePath(`/blog/category/${cat}`);
}

export function blogTagPath(tag: string): string {
  return normalizePath(`/blog/tag/${encodeURIComponent(tag)}`);
}

export function blogAuthorPath(authorSlug: string): string {
  return normalizePath(`/blog/author/${authorSlug}`);
}
