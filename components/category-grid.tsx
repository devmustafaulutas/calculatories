import Link from "next/link";
import { DollarSign, Heart, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getCalculatorsByCategory } from "@/lib/calculators";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Clock: <Clock className="h-6 w-6" />,
};

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the right calculator for your needs. Browse our collection of
            free online calculators organized by category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const count = getCalculatorsByCategory(category.slug).length;
            return (
              <Link key={category.slug} href={`/${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${category.color}`}
                    >
                      {iconMap[category.icon]}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      {count} calculator{count !== 1 ? "s" : ""}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
