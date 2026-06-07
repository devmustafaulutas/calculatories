import type { Author } from "@/data/schemas/author";
import {
  getCmsFallbackAuthor,
  getCmsFallbackAuthors,
  isCmsFallbackEnabled,
} from "@/lib/cms-fallback";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllTools } from "@/lib/tools";
import { fetchSanity } from "@/sanity/lib/fetch";
import { mapSanityAuthor } from "@/sanity/lib/map-author";
import {
  AUTHOR_BY_SLUG_QUERY,
  AUTHORS_QUERY,
} from "@/sanity/lib/queries";

export type { Author };

interface SanityAuthorRecord {
  _id: string;
  name: string;
  slug: string;
  legacyId?: string | null;
  role: string;
  jobTitle: string;
  bio?: unknown;
  credentials?: string[] | null;
  email: string;
  avatar?: { asset?: { _ref: string } } | null;
  sameAs?: string[] | null;
  knowsAbout?: string[] | null;
}

export async function getAllAuthors(): Promise<Author[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackAuthors();
  }
  const records = await fetchSanity<SanityAuthorRecord[]>({
    query: AUTHORS_QUERY,
    tags: ["author"],
  });
  return records.map(mapSanityAuthor);
}

export async function getAuthor(idOrSlug: string): Promise<Author | undefined> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackAuthor(idOrSlug);
  }
  const record = await fetchSanity<SanityAuthorRecord | null>({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug: idOrSlug },
    tags: ["author", `author:${idOrSlug}`],
  });
  return record ? mapSanityAuthor(record) : undefined;
}

export async function getAuthorBySlug(
  slug: string,
): Promise<Author | undefined> {
  return getAuthor(slug);
}

export async function getAuthorContent(authorId: string) {
  const author = await getAuthor(authorId);
  if (!author) {
    return {
      posts: [],
      reviewedPosts: [],
      authoredTools: [],
      reviewedTools: [],
    };
  }

  const allPosts = await getAllBlogPosts();
  const posts = allPosts.filter(
    (p) => p.authorId === author.id || p.authorSlug === author.slug,
  );
  const reviewedPosts = allPosts.filter(
    (p) => p.reviewerId === author.id || p.reviewerId === author.slug,
  );
  const authoredTools = getAllTools().filter(
    (t) => t.authorId === author.id || t.authorId === author.slug,
  );
  const reviewedTools = getAllTools().filter(
    (t) => t.reviewedBy === author.id || t.reviewedBy === author.slug,
  );

  return { posts, reviewedPosts, authoredTools, reviewedTools };
}
