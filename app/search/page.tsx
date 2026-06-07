import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { searchTools } from "@/lib/tools";
import { toolPath } from "@/lib/urls";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata() {
  return buildMetadata({
    title: "Search Calculators",
    description: "Search Calculatories for finance, health, salary, and productivity calculators.",
    path: "/search",
    noindex: true,
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchTools(query) : [];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Search Calculators</h1>

        {query ? (
          <>
            <p className="text-muted-foreground mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for
              &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <ul className="space-y-4">
                {results.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={toolPath(tool.category, tool.slug)}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {tool.shortDescription}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No calculators found. Try a different search term or browse our{" "}
                <Link href="/" className="text-primary hover:underline">
                  homepage
                </Link>
                .
              </p>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">
            Enter a search term using the search bar in the header.
          </p>
        )}
      </div>
    </div>
  );
}
