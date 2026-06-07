import Link from "next/link";
import {
  DollarSign,
  Heart,
  Briefcase,
  Clock,
  Wrench,
  Scale,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories } from "@/lib/categories";
import { getLiveToolsByCategory } from "@/lib/tools";

const categoryColors: Record<string, string> = {
  finance:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  health: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  salary: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  tools: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  legal: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  productivity:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Clock: <Clock className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllCategories().map((category) => {
            const count = getLiveToolsByCategory(category.slug).length;
            return (
              <Link key={category.slug} href={`/${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${categoryColors[category.slug] ?? categoryColors.tools}`}
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
