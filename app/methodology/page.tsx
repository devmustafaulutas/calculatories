import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Methodology - How We Source & Verify Calculator Data",
  description:
    "How Calculatories sources tax rates, median home prices, health guidelines, and other data used in our calculators. Updated regularly.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ label: "Methodology" }])} />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ label: "Methodology" }]} />
          <h1 className="text-3xl font-bold mb-6">Methodology</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p>
              This page describes how Calculatories sources, verifies, and
              maintains the data behind our calculators. Transparency about our
              methods is essential for YMYL (Your Money or Your Life) content.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Formulas &amp; Calculations
            </h2>
            <p>
              All calculator logic uses standard, widely accepted formulas. For
              example, our mortgage calculator implements the standard
              amortization formula used by lenders nationwide. Formula
              implementations are reviewed by subject-matter experts and tested
              against known benchmarks before publication.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Default Values &amp; Rates
            </h2>
            <p>
              Default interest rates and financial figures reflect recent national
              averages published by the Federal Reserve (H.15 release) and
              Freddie Mac Primary Mortgage Market Survey. We update defaults when
              published averages shift by more than 0.25 percentage points.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Localized &amp; Programmatic Data
            </h2>
            <p>
              Location-specific pages (e.g., state mortgage calculators) pull
              median home prices and tax rates from the US Census Bureau American
              Community Survey (ACS). Each localized figure includes the data
              vintage (year) and a direct link to the source. We do not publish
              location pages without genuinely differentiated local data.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Health Metrics
            </h2>
            <p>
              Health calculators align with guidelines from the CDC, NIH, and WHO
              where applicable. BMI categories follow WHO standards. Calorie and
              nutrition tools use Mifflin-St Jeor or Harris-Benedict equations as
              appropriate, reviewed by our registered dietitian.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Update Schedule
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Mortgage rate defaults: reviewed monthly</li>
              <li>Census/localized housing data: reviewed annually</li>
              <li>Tax brackets and thresholds: reviewed when IRS publishes updates</li>
              <li>Health guidelines: reviewed when CDC/NIH issues revisions</li>
              <li>All YMYL page content: full review at least annually</li>
            </ul>

            <p>
              Read our{" "}
              <Link
                href="/editorial-policy"
                className="text-primary hover:underline"
              >
                editorial policy
              </Link>{" "}
              for information on authorship and review processes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
