import { urlFor } from "./client";

interface SeoOgImage {
  asset?: { _ref: string };
}

export function resolveOgImageUrl(
  seoOgImage: SeoOgImage | null | undefined,
  heroImage: SeoOgImage | null | undefined,
  fallbackPath: string,
  canonicalUrlFn: (path: string) => string,
): string {
  const source = seoOgImage?.asset ? seoOgImage : heroImage?.asset ? heroImage : null;
  if (source) {
    return urlFor(source).width(1200).height(630).url();
  }
  return canonicalUrlFn(fallbackPath);
}
