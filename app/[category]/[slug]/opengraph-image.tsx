import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { OG_SIZE, OgLayout } from "@/lib/og-template";
import { getLiveTools, getToolByCategoryAndSlug } from "@/lib/tools";

export const alt = "Calculator Open Graph Image";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getLiveTools().map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

interface OgImageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { category, slug } = await params;
  const tool = getToolByCategoryAndSlug(category, slug);
  const categoryData = getCategory(category);

  return new ImageResponse(
    <OgLayout
      eyebrow={categoryData?.name ?? category}
      title={tool?.name ?? "Calculator"}
    />,
    { ...size },
  );
}
