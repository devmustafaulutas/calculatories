import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/seo/Byline";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { InContentAd } from "@/components/ads/InContentAd";
import { fetchPostBySlug, fetchPostSlugs } from "@/lib/blog/sanity";
import { buildMetadata } from "@/lib/seo";
import { article, breadcrumb, faqPage, person } from "@/lib/schema";
import { resolveOgImageUrl } from "@/sanity/lib/og-image";
import { blogPath, blogTagPath, canonicalUrl } from "@/lib/urls";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post || post.noindex) return { title: "Post Not Found" };

  const path = post.seo?.canonicalOverride
    ? new URL(post.seo.canonicalOverride).pathname
    : blogPath(slug);

  const ogImage = resolveOgImageUrl(
    post.seo?.ogImage as { asset?: { _ref: string } } | undefined,
    post.heroImage as { asset?: { _ref: string } } | undefined,
    `${blogPath(slug)}/opengraph-image`,
    canonicalUrl,
  );

  return buildMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.description,
    path,
    canonicalOverride: post.seo?.canonicalOverride ?? undefined,
    ogType: "article",
    ogImage,
    noindex: post.seo?.noindex ?? false,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author?.name ?? "Calculatories"],
    tags: post.tagTitles,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post || post.noindex || !post.author) notFound();

  const url = post.seo?.canonicalOverride ?? canonicalUrl(blogPath(slug));
  const schemas: Record<string, unknown>[] = [
    breadcrumb([
      { label: "Blog", href: "/blog" },
      { label: post.title },
    ]),
    person(post.author),
    article({
      title: post.title,
      description: post.description,
      url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: post.author,
      reviewer: post.reviewer ?? undefined,
    }),
  ];

  if (post.faq.length > 0) {
    schemas.push(faqPage(post.faq));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <article className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Link
                href={`/blog/category/${post.categorySlug}`}
                className="hover:text-foreground"
              >
                {post.category}
              </Link>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            <div className="mt-4">
              <Byline
                authorId={post.authorId}
                reviewerId={post.reviewerId}
                author={post.author}
                reviewer={post.reviewer ?? undefined}
              />
              <LastUpdated date={post.updatedAt} />
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableTextRenderer value={post.body} />
          </div>

          <InContentAd />

          <FaqSection faqs={post.faq} />

          {post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <Link
                    key={tag}
                    href={blogTagPath(tag)}
                    className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-muted/80"
                  >
                    {post.tagTitles[i] ?? tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
