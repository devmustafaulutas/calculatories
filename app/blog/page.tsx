import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb } from "@/lib/schema";
import { getPaginatedPosts } from "@/lib/blog";
import { blogPath } from "@/lib/urls";

interface BlogIndexProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = buildMetadata({
  title: "Blog - Financial & Health Calculator Guides",
  description:
    "Expert guides on mortgages, personal finance, health metrics, and more. Written and reviewed by professionals.",
  path: "/blog",
});

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { posts, totalPages, currentPage } = await getPaginatedPosts(page);

  return (
    <>
      <JsonLd
        data={breadcrumb([{ label: "Blog" }])}
      />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Guides, tips, and deep dives on the topics behind our calculators.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={blogPath(post.slug)}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="flex justify-center gap-4 mt-8"
              aria-label="Blog pagination"
            >
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="text-primary hover:underline"
                >
                  Previous
                </Link>
              )}
              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="text-primary hover:underline"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
