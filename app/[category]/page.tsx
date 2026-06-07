import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories, getCategory } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb, collectionPage } from "@/lib/schema";
import { getLiveToolsByCategory } from "@/lib/tools";
import { canonicalUrl, categoryPath, toolPath } from "@/lib/urls";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategory(category);

  if (!cat) return { title: "Category Not Found" };

  return buildMetadata({
    title: cat.seo.title,
    description: cat.seo.description,
    path: categoryPath(category),
    ogImage: `${categoryPath(category)}/opengraph-image`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategory(category);

  if (!cat) notFound();

  const tools = getLiveToolsByCategory(category);
  const path = categoryPath(category);

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([{ label: cat.name }]),
          collectionPage({
            name: cat.name,
            description: cat.description,
            url: canonicalUrl(path),
          }),
        ]}
      />
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: cat.name }]} />

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{cat.name}</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            {cat.intro}
          </p>

          {tools.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={toolPath(category, tool.slug)}
                  className="group"
                >
                  <Card className="h-full transition-colors hover:border-primary/50">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {tool.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary mt-4">
                        Use calculator
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Calculators in this category are coming soon. Browse our{" "}
              <Link href="/" className="text-primary hover:underline">
                homepage
              </Link>{" "}
              for available tools.
            </p>
          )}

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Browse Other Categories</h2>
            <ul className="flex flex-wrap gap-3">
              {getAllCategories()
                .filter((c) => c.slug !== category)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={categoryPath(c.slug)}
                      className="text-sm text-primary hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
