import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `https://calculatories.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        />

        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <p className="lead">{post.excerpt}</p>

            <h2>Introduction</h2>
            <p>
              This is a placeholder for the full blog post content. In a
              production environment, this would be loaded from a CMS or
              markdown files. The content would include detailed explanations,
              examples, and practical advice related to the topic.
            </p>

            <h2>Key Points</h2>
            <p>
              Here we would cover the main points of the article, breaking down
              complex concepts into easy-to-understand sections. Each section
              would provide value to the reader and help them understand the
              topic better.
            </p>

            <ul>
              <li>First important point with detailed explanation</li>
              <li>Second key concept to understand</li>
              <li>Third practical tip for implementation</li>
              <li>Fourth consideration for readers</li>
            </ul>

            <h2>Practical Application</h2>
            <p>
              We would include practical examples and step-by-step guides that
              readers can follow. This section would reference our calculators
              and show how to use them effectively.
            </p>

            <h2>Conclusion</h2>
            <p>
              A summary of the key takeaways and call-to-action encouraging
              readers to use our calculators to apply what they have learned.
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-8">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow group">
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-primary mt-2">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
