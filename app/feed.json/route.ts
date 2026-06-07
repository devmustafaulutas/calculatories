import { getAllBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { canonicalUrl } from "@/lib/urls";

export async function GET() {
  const posts = await getAllBlogPosts();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${SITE_NAME} Blog`,
    home_page_url: `${SITE_URL}/blog`,
    feed_url: `${SITE_URL}/feed.json`,
    description: `Calculator guides and financial tips from ${SITE_NAME}`,
    language: "en-US",
    items: posts.map((post) => ({
      id: canonicalUrl(`/blog/${post.slug}`),
      url: canonicalUrl(`/blog/${post.slug}`),
      title: post.title,
      summary: post.description,
      date_published: post.publishedAt,
      date_modified: post.updatedAt,
      tags: post.tags,
    })),
  };

  return Response.json(feed, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
