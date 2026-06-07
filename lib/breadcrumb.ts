import type { BreadcrumbItem } from "@/lib/schema";
import { categoryPath } from "@/lib/urls";

export function toolBreadcrumbItems(
  categorySlug: string,
  categoryName: string,
  toolName: string,
): BreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    { label: categoryName, href: categoryPath(categorySlug) },
    { label: toolName },
  ];
}

export function locationBreadcrumbItems(
  categorySlug: string,
  categoryName: string,
  toolName: string,
  toolSlug: string,
  locationName: string,
): BreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    { label: categoryName, href: categoryPath(categorySlug) },
    { label: toolName, href: `/${categorySlug}/${toolSlug}` },
    { label: locationName },
  ];
}
