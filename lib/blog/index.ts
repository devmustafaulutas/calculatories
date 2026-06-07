import { blogPath } from "@/lib/urls";
import type { BlogPostMeta } from "@/lib/blog/sanity";
import {
  fetchAllPublishedPosts,
  fetchPostsByAuthor,
  fetchPostsByCategory,
  fetchPostsByTag,
} from "@/lib/blog/sanity";

export type { BlogPostMeta, BlogPostFull, BlogFaqItem } from "@/lib/blog/sanity";

const POSTS_PER_PAGE = 10;

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  return fetchAllPublishedPosts();
}

export async function getBlogPostMeta(
  slug: string,
): Promise<BlogPostMeta | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPostMeta[]> {
  return fetchPostsByCategory(category);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  return fetchPostsByTag(tag);
}

export async function getBlogPostsByAuthor(
  authorSlug: string,
): Promise<BlogPostMeta[]> {
  return fetchPostsByAuthor(authorSlug);
}

export async function getPaginatedPosts(page: number) {
  const posts = await getAllBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: page,
    totalPosts: posts.length,
  };
}

export async function getAllBlogUrls(): Promise<
  { url: string; lastModified: string }[]
> {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({
    url: blogPath(p.slug),
    lastModified: p.updatedAt,
  }));
}

export async function getAllBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export async function getAllBlogTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return [...new Set(posts.flatMap((p) => p.tags))];
}
