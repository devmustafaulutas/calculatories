import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SUPPORTED_LOCALES,
} from "@/lib/site-config";
import { canonicalUrl } from "@/lib/urls";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  canonicalOverride?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    canonicalOverride,
    ogImage,
    ogType = "website",
    noindex = false,
    publishedTime,
    modifiedTime,
    authors,
    tags,
  } = input;

  const canonical = canonicalOverride ?? canonicalUrl(path);
  const imagePath = ogImage ?? DEFAULT_OG_IMAGE.url;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : canonicalUrl(imagePath);

  const languages: Record<string, string> = {
    "x-default": canonical,
  };
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = canonical;
  }

  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    ...(noindex
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
