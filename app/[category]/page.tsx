import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getCalculatorsByCategory,
  categories,
} from "@/lib/calculators";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
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

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  PiggyBank: <PiggyBank className="h-6 w-6" />,
  Flame: <Flame className="h-6 w-6" />,
  Calculator: <Calculator className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${cat.name} Calculators - Free Online Tools`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} Calculators | Calculatories`,
      description: cat.description,
      url: `https://calculatories.com/${cat.slug}`,
    },
    alternates: {
      canonical: `https://calculatories.com/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const calculators = getCalculatorsByCategory(category);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={[{ label: cat.name }]} />

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {cat.name} Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {cat.description}
          </p>
        </div>

        {calculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.categorySlug}/${calc.slug}`}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      {iconMap[calc.icon] || <Calculator className="h-6 w-6" />}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {calc.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {calc.shortDescription}
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Use Calculator
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No calculators available in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
