import {
  getCmsFallbackPost,
  getCmsFallbackPosts,
  isCmsFallbackEnabled,
} from "@/lib/cms-fallback";
import { fetchSanity } from "@/sanity/lib/fetch";
import {
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_BY_TAG_QUERY,
  POSTS_QUERY,
} from "@/sanity/lib/queries";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  tagTitles: string[];
  authorId: string;
  authorSlug: string;
  reviewerId?: string;
  publishedAt: string;
  updatedAt: string;
  heroImage?: unknown;
  readTime: string;
  noindex: boolean;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPostSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalOverride?: string | null;
  ogImage?: unknown;
  noindex?: boolean | null;
}

export interface BlogPostFull extends BlogPostMeta {
  body: unknown;
  faq: BlogFaqItem[];
  seo?: BlogPostSeo | null;
  author: import("@/data/schemas/author").Author | null;
  reviewer: import("@/data/schemas/author").Author | null;
}

interface SanityPostListRecord {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  tagTitles: string[];
  authorId: string;
  authorSlug: string;
  reviewerId?: string | null;
  publishedAt: string;
  updatedAt: string;
  heroImage?: unknown;
  noindex: boolean;
}

function estimateReadTime(body: unknown): string {
  if (!Array.isArray(body)) return "1 min read";
  const words = body
    .filter((b: { _type?: string }) => b._type === "block")
    .flatMap((b: { children?: { text?: string }[] }) =>
      (b.children ?? []).map((c) => c.text ?? ""),
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function mapPostMeta(record: SanityPostListRecord, body?: unknown): BlogPostMeta {
  return {
    slug: record.slug,
    title: record.title,
    description: record.excerpt,
    category: record.category,
    categorySlug: record.categorySlug,
    tags: record.tags ?? [],
    tagTitles: record.tagTitles ?? record.tags ?? [],
    authorId: record.authorId,
    authorSlug: record.authorSlug,
    reviewerId: record.reviewerId ?? undefined,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt ?? record.publishedAt,
    heroImage: record.heroImage,
    readTime: estimateReadTime(body),
    noindex: record.noindex,
  };
}

export async function fetchAllPublishedPosts(): Promise<BlogPostMeta[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackPosts();
  }
  const records = await fetchSanity<SanityPostListRecord[]>({
    query: POSTS_QUERY,
    tags: ["post", "blog:index"],
  });
  return records.map((r) => mapPostMeta(r));
}

export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPostFull | null> {
  if (isCmsFallbackEnabled()) {
    const post = getCmsFallbackPost();
    return post?.slug === slug ? post : null;
  }

  const { mapSanityAuthor } = await import("@/sanity/lib/map-author");

  const record = await fetchSanity<{
    slug: string;
    title: string;
    excerpt: string;
    body: unknown;
    faq?: BlogFaqItem[] | null;
    seo?: BlogPostSeo | null;
    category: string;
    categorySlug: string;
    tags: string[];
    tagTitles: string[];
    publishedAt: string;
    updatedAt: string;
    heroImage?: unknown;
    author: Parameters<typeof mapSanityAuthor>[0] | null;
    reviewer: Parameters<typeof mapSanityAuthor>[0] | null;
  } | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`, "blog:index"],
  });

  if (!record?.slug || !record.publishedAt) return null;

  const meta = mapPostMeta(
    {
      slug: record.slug,
      title: record.title,
      excerpt: record.excerpt,
      category: record.category,
      categorySlug: record.categorySlug,
      tags: record.tags,
      tagTitles: record.tagTitles,
      authorId: record.author?.slug ?? "",
      authorSlug: record.author?.slug ?? "",
      reviewerId: record.reviewer?.slug,
      publishedAt: record.publishedAt,
      updatedAt: record.updatedAt,
      heroImage: record.heroImage,
      noindex: record.seo?.noindex ?? false,
    },
    record.body,
  );

  return {
    ...meta,
    body: record.body,
    faq: record.faq ?? [],
    seo: record.seo,
    author: record.author ? mapSanityAuthor(record.author) : null,
    reviewer: record.reviewer ? mapSanityAuthor(record.reviewer) : null,
  };
}

export async function fetchPostSlugs(): Promise<string[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackPosts().map((p) => p.slug);
  }
  const records = await fetchSanity<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post", "blog:index"],
  });
  return records.map((r) => r.slug);
}

export async function fetchPostsByCategory(
  category: string,
): Promise<BlogPostMeta[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackPosts().filter(
      (p) => p.categorySlug.toLowerCase() === category.toLowerCase(),
    );
  }
  const records = await fetchSanity<SanityPostListRecord[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { category },
    tags: ["post", "blog:index", "blogCategory"],
  });
  return records.map((r) => mapPostMeta(r));
}

export async function fetchPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackPosts().filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }
  const records = await fetchSanity<SanityPostListRecord[]>({
    query: POSTS_BY_TAG_QUERY,
    params: { tag },
    tags: ["post", "blog:index", "tag"],
  });
  return records.map((r) => mapPostMeta(r));
}

export async function fetchPostsByAuthor(
  authorSlug: string,
): Promise<BlogPostMeta[]> {
  if (isCmsFallbackEnabled()) {
    return getCmsFallbackPosts().filter(
      (p) =>
        p.authorSlug === authorSlug ||
        p.authorId === authorSlug,
    );
  }
  const records = await fetchSanity<SanityPostListRecord[]>({
    query: POSTS_BY_AUTHOR_QUERY,
    params: { slug: authorSlug },
    tags: ["post", "blog:index", `author:${authorSlug}`],
  });
  return records.map((r) => mapPostMeta(r));
}

export async function fetchAllPostsForBuild(): Promise<BlogPostMeta[]> {
  const records = await fetchSanity<
    (SanityPostListRecord & { body?: unknown })[]
  >({
    query: ALL_POSTS_QUERY,
    tags: ["post", "blog:index"],
  });
  return records
    .filter((r) => r.publishedAt && !r.noindex)
    .map((r) => mapPostMeta(r, r.body));
}
