import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContextualLinks } from "@/lib/contextual-links";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedToolsProps {
  currentSlug: string;
  limit?: number;
}

export function RelatedTools({ currentSlug, limit = 3 }: RelatedToolsProps) {
  const related = getContextualLinks(currentSlug, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Calculators</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {link.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-2">
                  Learn more
                  <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
