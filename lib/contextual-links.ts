import { locations } from "@/data/locations";
import { getCategory } from "@/lib/categories";
import { getRelatedTools, getTool } from "@/lib/tools";
import {
  blogPath,
  categoryPath,
  locationPath,
  toolPath,
} from "@/lib/urls";

export interface ContextualLink {
  href: string;
  name: string;
  description: string;
}

const TOOL_BLOG_LINKS: Record<string, ContextualLink[]> = {
  "mortgage-calculator": [
    {
      href: blogPath("how-to-calculate-mortgage-payments"),
      name: "How to Calculate Mortgage Payments: A Complete Guide",
      description:
        "Learn the mortgage payment formula and factors that affect your monthly payment.",
    },
  ],
  "compound-interest-calculator": [
    {
      href: blogPath("how-to-calculate-mortgage-payments"),
      name: "How to Calculate Mortgage Payments: A Complete Guide",
      description:
        "Understand loan amortization to compare debt costs against compound investment growth.",
    },
  ],
  "loan-repayment-calculator": [
    {
      href: blogPath("how-to-calculate-mortgage-payments"),
      name: "How to Calculate Mortgage Payments: A Complete Guide",
      description:
        "Learn the same amortization formula applied to home loans and installment debt.",
    },
  ],
};

export function getContextualLinks(
  currentSlug: string,
  limit = 3,
): ContextualLink[] {
  const seen = new Set<string>();
  const links: ContextualLink[] = [];

  const add = (link: ContextualLink) => {
    if (seen.has(link.href) || links.length >= limit) return;
    seen.add(link.href);
    links.push(link);
  };

  for (const tool of getRelatedTools(currentSlug, limit)) {
    add({
      href: toolPath(tool.category, tool.slug),
      name: tool.name,
      description: tool.shortDescription,
    });
  }

  for (const loc of locations.filter((l) => l.toolSlug === currentSlug)) {
    add({
      href: locationPath(loc.categorySlug, loc.toolSlug, loc.slug),
      name: `${loc.name} Mortgage Calculator`,
      description:
        loc.intro.slice(0, 120) + (loc.intro.length > 120 ? "…" : ""),
    });
  }

  for (const blog of TOOL_BLOG_LINKS[currentSlug] ?? []) {
    add(blog);
  }

  const current = getTool(currentSlug);
  if (current) {
    const cat = getCategory(current.category);
    if (cat) {
      add({
        href: categoryPath(cat.slug),
        name: `${cat.name} Calculators`,
        description: cat.description.slice(0, 120),
      });
    }
  }

  return links.slice(0, limit);
}
