import { ImageResponse } from "next/og";
import { getAllCategories, getCategory } from "@/lib/categories";
import { OG_SIZE, OgLayout } from "@/lib/og-template";

export const alt = "Category Open Graph Image";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.slug }));
}

interface OgImageProps {
  params: Promise<{ category: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { category } = await params;
  const cat = getCategory(category);

  return new ImageResponse(
    <OgLayout eyebrow="Category" title={cat?.name ?? "Calculators"} />,
    { ...size },
  );
}
