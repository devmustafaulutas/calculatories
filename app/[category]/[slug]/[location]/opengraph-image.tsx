import { ImageResponse } from "next/og";
import { getLocationVariant } from "@/lib/locations";
import { OG_SIZE, OgLayout } from "@/lib/og-template";
import { getToolByCategoryAndSlug } from "@/lib/tools";

export const alt = "Location Calculator Open Graph Image";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  const { locations } = await import("@/data/locations");
  return locations.map((loc) => ({
    category: loc.categorySlug,
    slug: loc.toolSlug,
    location: loc.slug,
  }));
}

interface OgImageProps {
  params: Promise<{ category: string; slug: string; location: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { category, slug, location } = await params;
  const variant = getLocationVariant(category, slug, location);
  const tool = getToolByCategoryAndSlug(category, slug);

  return new ImageResponse(
    <OgLayout
      eyebrow={variant?.name ?? location}
      title={tool?.name ?? "Calculator"}
    />,
    { ...size },
  );
}
