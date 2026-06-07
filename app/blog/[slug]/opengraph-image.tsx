import { ImageResponse } from "next/og";
import { fetchPostBySlug, fetchPostSlugs } from "@/lib/blog/sanity";
import { OG_SIZE, OgLayout } from "@/lib/og-template";

export const alt = "Blog Post Open Graph Image";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  return new ImageResponse(
    <OgLayout
      eyebrow={post?.category ?? "Blog"}
      title={post?.title ?? "Article"}
    />,
    { ...size },
  );
}
