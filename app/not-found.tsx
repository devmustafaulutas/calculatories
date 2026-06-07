import Link from "next/link";
import { getFeaturedTools } from "@/lib/tools";
import { toolPath } from "@/lib/urls";

export default function NotFound() {
  const popular = getFeaturedTools();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mb-8">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Search calculators
          </Link>
        </div>

        {popular.length > 0 && (
          <div className="text-left">
            <h3 className="font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2">
              {popular.map((tool) => (
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
          </div>
        )}

        <p className="mt-8">
          <Link href="/" className="text-primary hover:underline">
            Return to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
