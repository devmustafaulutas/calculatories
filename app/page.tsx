import { Calculator, CheckCircle, Zap, Shield } from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedCalculators } from "@/components/featured-calculators";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4" />
              100+ Free Calculators
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Calculate Anything,{" "}
              <span className="text-primary">Instantly</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
              Free online calculators for finance, health, salary, and
              productivity. Accurate results in seconds, no sign-up required.
            </p>

            <HeroSearch />

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>No Sign-up Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <FeaturedCalculators />

      {/* Category Grid */}
      <CategoryGrid />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Calculate?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Start using our free calculators today. No sign-up required, instant
            results, and completely free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/finance"
              className="inline-flex items-center justify-center rounded-lg bg-background text-foreground px-6 py-3 font-medium hover:bg-background/90 transition-colors"
            >
              Browse All Calculators
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
