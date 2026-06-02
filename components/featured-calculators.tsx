import Link from "next/link";
import {
  Home,
  TrendingUp,
  Scale,
  PiggyBank,
  Flame,
  Calculator,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedCalculators } from "@/lib/calculators";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  PiggyBank: <PiggyBank className="h-6 w-6" />,
  Flame: <Flame className="h-6 w-6" />,
  Calculator: <Calculator className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
};

export function FeaturedCalculators() {
  const featured = getFeaturedCalculators();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Popular Tools
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Featured Calculators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular calculators, trusted by thousands of users every
            day for accurate and instant calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.categorySlug}/${calc.slug}`}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {iconMap[calc.icon] || <Calculator className="h-6 w-6" />}
                    </div>
                    <Badge variant="outline">{calc.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {calc.shortDescription}
                  </p>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Try Now
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
