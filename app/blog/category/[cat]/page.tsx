import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getBlogPostsByCategory } from "@/lib/blog";
import { blogPath } from "@/lib/urls";

interface BlogCategoryPageProps {
  params: Promise<{ cat: string }>;
}

export async function generateMetadata({ params }: BlogCategoryPageProps) {
  const { cat } = await params;
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);
  return buildMetadata({
    title: `${label} Articles - Calculatories Blog`,
    description: `Browse ${label.toLowerCase()} articles, guides, and calculator tips on Calculatories.`,
    path: `/blog/category/${cat}`,
  });
}

export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { cat } = await params;
  const posts = await getBlogPostsByCategory(cat);

  if (posts.length === 0) notFound();

  const label = cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: label },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8">{label} Articles</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={blogPath(post.slug)}
                className="text-lg font-medium hover:text-primary"
              >
                {post.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
