import { notFound } from "next/navigation";
import { ToolPageShell } from "@/components/layout/ToolPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolBreadcrumbItems } from "@/lib/breadcrumb";
import { getCategory } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import {
  APPLICATION_CATEGORIES,
  breadcrumb,
  faqPage,
  softwareApplication,
} from "@/lib/schema";
import { getToolContent } from "@/lib/tool-content";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { getLiveTools, getToolByCategoryAndSlug } from "@/lib/tools";
import { getToolComponent } from "@/lib/tool-components";
import { canonicalUrl, toolPath } from "@/lib/urls";

interface ToolPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getLiveTools().map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { category, slug } = await params;
  const tool = getToolByCategoryAndSlug(category, slug);

  if (!tool || tool.status !== "live") {
    return { title: "Calculator Not Found" };
  }

  return buildMetadata({
    title: `${tool.name} - ${tool.shortDescription}`,
    description: tool.longDescription.slice(0, 160),
    path: toolPath(category, slug),
    ogImage: `${toolPath(category, slug)}/opengraph-image`,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category, slug } = await params;
  const tool = getToolByCategoryAndSlug(category, slug);

  if (!tool || tool.status !== "live") {
    notFound();
  }

  const categoryData = getCategory(category);
  const contentEntry = getToolContent(slug);

  if (!getToolComponent(slug) || !contentEntry) {
    notFound();
  }

  const path = toolPath(category, slug);
  const url = canonicalUrl(path);
  const { Content, faqs } = contentEntry;

  const schemas = [
    breadcrumb(
      toolBreadcrumbItems(
        category,
        categoryData?.name ?? category,
        tool.name,
      ),
    ),
    softwareApplication({
      name: tool.name,
      description: tool.longDescription,
      url,
      schemaType: tool.schemaType,
      applicationCategory:
        APPLICATION_CATEGORIES[category] ?? "UtilitiesApplication",
    }),
    faqPage(faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ToolPageShell
        tool={tool}
        content={<Content />}
      >
        <ToolRenderer slug={slug} />
      </ToolPageShell>
    </>
  );
}
