import Link from "next/link";
import {
  Home,
  TrendingUp,
  Scale,
  PiggyBank,
  Flame,
  Calculator,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator as CalculatorType } from "@/lib/calculators";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  PiggyBank: <PiggyBank className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
};

interface RelatedCalculatorsProps {
  calculators: CalculatorType[];
  title?: string;
}

export function RelatedCalculators({
  calculators,
  title = "Related Calculators",
}: RelatedCalculatorsProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <Link key={calc.slug} href={`/${calc.categorySlug}/${calc.slug}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {iconMap[calc.icon] || <Calculator className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{calc.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {calc.shortDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
