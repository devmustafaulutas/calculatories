import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPath } from "@/lib/urls";

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  title?: string;
}

export function RelatedPosts({
  posts,
  title = "Related Articles",
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={blogPath(post.slug)}
              className="group flex items-start justify-between gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
            >
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary mt-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
