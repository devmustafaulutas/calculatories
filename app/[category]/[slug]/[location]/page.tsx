import { notFound } from "next/navigation";
import { ToolPageShell } from "@/components/layout/ToolPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocationContent } from "@/app/[category]/[slug]/[location]/content";
import { locationBreadcrumbItems } from "@/lib/breadcrumb";
import { getCategory } from "@/lib/categories";
import { getLocationVariant, getLocationsForTool } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";
import {
  APPLICATION_CATEGORIES,
  breadcrumb,
  faqPage,
  softwareApplication,
} from "@/lib/schema";
import { getToolContent } from "@/lib/tool-content";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { getToolComponent } from "@/lib/tool-components";
import { getToolByCategoryAndSlug } from "@/lib/tools";
import { canonicalUrl, locationPath } from "@/lib/urls";

interface LocationPageProps {
  params: Promise<{ category: string; slug: string; location: string }>;
}

export async function generateStaticParams() {
  const { locations } = await import("@/data/locations");
  return locations.map((loc) => ({
    category: loc.categorySlug,
    slug: loc.toolSlug,
    location: loc.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { category, slug, location } = await params;
  const variant = getLocationVariant(category, slug, location);
  const tool = getToolByCategoryAndSlug(category, slug);

  if (!variant || !tool) return { title: "Page Not Found" };

  return buildMetadata({
    title: `${tool.name} for ${variant.name} - Localized Estimates`,
    description: `Estimate mortgage payments in ${variant.name} using localized median home prices and property tax data. Free calculator with ${variant.name}-specific market context.`,
    path: locationPath(category, slug, location),
    ogImage: `${locationPath(category, slug, location)}/opengraph-image`,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { category, slug, location } = await params;
  const variant = getLocationVariant(category, slug, location);
  const tool = getToolByCategoryAndSlug(category, slug);
  const categoryData = getCategory(category);

  if (!variant || !tool || tool.status !== "live") notFound();

  const contentEntry = getToolContent(slug);
  if (!getToolComponent(slug) || !contentEntry) notFound();

  const path = locationPath(category, slug, location);
  const url = canonicalUrl(path);
  const siblingLocations = getLocationsForTool(slug).filter(
    (l) => l.slug !== location,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumb(
            locationBreadcrumbItems(
              category,
              categoryData?.name ?? category,
              tool.name,
              slug,
              variant.name,
            ),
          ),
          softwareApplication({
            name: `${tool.name} - ${variant.name}`,
            description: variant.intro,
            url,
            schemaType: tool.schemaType,
            applicationCategory:
              APPLICATION_CATEGORIES[category] ?? "UtilitiesApplication",
          }),
          faqPage(contentEntry.faqs),
        ]}
      />
      <ToolPageShell
        tool={{ ...tool, h1: `${tool.h1} for ${variant.name}` }}
        content={
          <LocationContent
            variant={variant}
            siblingLocations={siblingLocations}
            baseContent={<contentEntry.Content />}
          />
        }
      >
        <ToolRenderer
          slug={slug}
          defaultRate={variant.localizedData.avgMortgageRate}
        />
      </ToolPageShell>
    </>
  );
}
