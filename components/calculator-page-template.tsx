import { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQSection, FAQItem } from "@/components/faq-section";
import { RelatedCalculators } from "@/components/related-calculators";
import { InContentAd } from "@/components/ads";
import { Calculator, getRelatedCalculators } from "@/lib/calculators";

interface CalculatorPageTemplateProps {
  calculator: Calculator;
  children: ReactNode; // The calculator widget
  howToUse: string[];
  howToCalculate: ReactNode;
  faqs: FAQItem[];
}

export function CalculatorPageTemplate({
  calculator,
  children,
  howToUse,
  howToCalculate,
  faqs,
}: CalculatorPageTemplateProps) {
  const relatedCalculators = getRelatedCalculators(calculator.slug, 3);

  const calculatorJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    description: calculator.description,
    url: `https://calculatories.com/${calculator.categorySlug}/${calculator.slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />

      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: calculator.category, href: `/${calculator.categorySlug}` },
            { label: calculator.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {calculator.name}
            </h1>

            {/* Calculator Widget */}
            <div className="mb-8">{children}</div>

            {/* Short Description */}
            <p className="text-lg text-muted-foreground mb-8">
              {calculator.description}
            </p>

            {/* In-Content Ad */}
            <InContentAd adSlot="1234567890" adClient="ca-pub-XXXXXXXX" />

            {/* How to Use Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                How to Use the {calculator.name}
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                {howToUse.map((step, index) => (
                  <li key={index} className="pl-2">
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            {/* How to Calculate Section */}
            <section className="mb-12 prose prose-slate dark:prose-invert max-w-none">
              {howToCalculate}
            </section>

            {/* FAQ Section */}
            <FAQSection faqs={faqs} calculatorName={calculator.name} />

            {/* Related Calculators */}
            <RelatedCalculators calculators={relatedCalculators} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Links */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">On This Page</h3>
                <nav className="space-y-2 text-sm">
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Calculator
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How to Use
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How to Calculate
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Related Calculators
                  </a>
                </nav>
              </div>

              {/* Sidebar Ad Placeholder */}
              <div className="bg-muted/30 rounded-lg p-4 text-center text-sm text-muted-foreground border border-dashed">
                <div className="min-h-[250px] flex items-center justify-center">
                  Ad Space
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
