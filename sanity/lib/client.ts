import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { createClient, type SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-12-01";

function createSanityClient(): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    stega: {
      studioUrl: "/studio",
    },
  });
}

export const client: SanityClient | null = projectId
  ? createSanityClient()
  : null;

const builder =
  projectId && client
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity client is not configured");
  }
  return builder.image(source);
}
