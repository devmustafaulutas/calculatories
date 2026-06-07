import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getBlogPostsByTag } from "@/lib/blog";
import { blogPath } from "@/lib/urls";

interface BlogTagPageProps {
  params: Promise<{ tag: string }>;
}

function resolveTagParam(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: BlogTagPageProps) {
  const { tag: rawTag } = await params;
  const tag = resolveTagParam(rawTag);
  return buildMetadata({
    title: `Articles tagged "${tag}" - Calculatories Blog`,
    description: `Browse calculator guides and articles tagged with ${tag}.`,
    path: `/blog/tag/${encodeURIComponent(tag)}`,
  });
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag: rawTag } = await params;
  const tag = resolveTagParam(rawTag);
  const posts = await getBlogPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: `#${tag}` },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8">#{tag}</h1>
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
