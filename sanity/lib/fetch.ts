import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { sanityFetch } from "./live";

type SanityQueryParams = QueryParams | Record<string, unknown>;

interface FetchOptions {
  query: string;
  params?: SanityQueryParams;
  tags: string[];
}

interface SanityFetchArgs {
  query: string;
  params?: SanityQueryParams;
  perspective: "published" | "previewDrafts";
  stega: boolean;
  tags: string[];
}

export async function fetchSanity<T>({
  query,
  params = {},
  tags,
}: FetchOptions): Promise<T> {
  const { isEnabled } = await draftMode();

  const fetchArgs: SanityFetchArgs = {
    query,
    params,
    perspective: isEnabled ? "previewDrafts" : "published",
    stega: isEnabled,
    tags,
  };

  return (sanityFetch as (args: SanityFetchArgs) => Promise<T>)(fetchArgs);
}
