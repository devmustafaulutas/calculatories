import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllAuthors, getAuthorBySlug, getAuthorContent } from "@/lib/authors";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb, person } from "@/lib/schema";
import { blogPath, toolPath } from "@/lib/urls";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };

  return buildMetadata({
    title: `${author.name} - ${author.jobTitle}`,
    description: author.bio.slice(0, 160),
    path: `/authors/${slug}`,
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const { posts, authoredTools, reviewedTools } = await getAuthorContent(
    author.id,
  );

  return (
    <>
      <JsonLd
        data={breadcrumb([
          { label: "Authors", href: "/about" },
          { label: author.name },
        ])}
      />
      <JsonLd data={person(author)} />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Authors", href: "/about" },
              { label: author.name },
            ]}
          />

          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            <p className="text-lg text-muted-foreground">{author.jobTitle}</p>
            {author.credentials.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {author.credentials.join(" · ")}
              </p>
            )}
          </header>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {author.bio}
          </p>

          {author.knowsAbout.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold mb-2">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {author.knowsAbout.map((topic) => (
                  <span
                    key={topic}
                    className="text-sm px-3 py-1 bg-muted rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {authoredTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Calculators Written</h2>
              <ul className="space-y-2">
                {authoredTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={toolPath(tool.category, tool.slug)}
                      className="text-primary hover:underline"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reviewedTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Calculators Reviewed</h2>
              <ul className="space-y-2">
                {reviewedTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={toolPath(tool.category, tool.slug)}
                      className="text-primary hover:underline"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {posts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Articles</h2>
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={blogPath(post.slug)}
                      className="text-primary hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
