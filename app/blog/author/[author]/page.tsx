import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAuthorBySlug } from "@/lib/authors";
import { getBlogPostsByAuthor } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { blogPath } from "@/lib/urls";

interface BlogAuthorPageProps {
  params: Promise<{ author: string }>;
}

export async function generateMetadata({ params }: BlogAuthorPageProps) {
  const { author } = await params;
  const authorData = await getAuthorBySlug(author);
  if (!authorData) return { title: "Author Not Found" };

  return buildMetadata({
    title: `Articles by ${authorData.name} - Calculatories Blog`,
    description: `Read articles written by ${authorData.name}, ${authorData.jobTitle}.`,
    path: `/blog/author/${author}`,
  });
}

export default async function BlogAuthorPage({ params }: BlogAuthorPageProps) {
  const { author } = await params;
  const authorData = await getAuthorBySlug(author);
  if (!authorData) notFound();

  const posts = await getBlogPostsByAuthor(author);
  if (posts.length === 0) notFound();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: authorData.name },
          ]}
        />
        <h1 className="text-3xl font-bold mb-2">
          Articles by {authorData.name}
        </h1>
        <p className="text-muted-foreground mb-8">{authorData.jobTitle}</p>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={blogPath(post.slug)}
                className="text-lg font-medium hover:text-primary"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
