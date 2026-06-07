import { getAllBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { canonicalUrl } from "@/lib/urls";

export async function GET() {
  const posts = await getAllBlogPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${canonicalUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${canonicalUrl(`/blog/${post.slug}`)}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Calculator guides and financial tips from ${SITE_NAME}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
