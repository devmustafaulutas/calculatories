import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Editorial Policy - How We Create & Review Content",
  description:
    "Learn how Calculatories creates, reviews, and updates calculator content. Our editorial standards for YMYL finance and health topics.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ label: "Editorial Policy" }])} />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ label: "Editorial Policy" }]} />
          <h1 className="text-3xl font-bold mb-6">Editorial Policy</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p>
              Calculatories is committed to publishing accurate, helpful, and
              transparent calculator content. This policy explains how we create,
              review, and maintain our tools — especially for Your Money or Your
              Life (YMYL) topics in finance, health, and legal categories.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Content Creation
            </h2>
            <p>
              Every calculator page is written by a subject-matter author with
              relevant expertise. Authors are identified by name on each page,
              with credentials and a link to their full bio. Content is original,
              written in plain US English, and structured to help you understand
              both how to use the tool and how the underlying math works.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Expert Review (YMYL)
            </h2>
            <p>
              Finance, health, and legal calculators undergo independent review
              by a qualified reviewer before publication. Reviewers hold relevant
              credentials (e.g., CPA for finance, RD for health) and are credited
              on each page. Reviewers verify formulas, default values, and
              explanatory content for accuracy and alignment with authoritative
              sources.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Updates &amp; Corrections
            </h2>
            <p>
              We display a &ldquo;Last updated&rdquo; date on every YMYL page.
              Rates, medians, and regulatory thresholds are reviewed at least
              annually and updated when material changes occur. If you spot an
              error, contact us at{" "}
              <a href="mailto:hello@calculatories.com" className="text-primary">
                hello@calculatories.com
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Sources &amp; Citations
            </h2>
            <p>
              We cite authoritative sources (IRS, Federal Reserve, CDC, US Census,
              BLS) for any statistics or rates referenced in our content.
              Authoritative government and institutional sources receive
              dofollow links; affiliate or promotional links use nofollow where
              appropriate.
            </p>

            <h2 className="text-xl font-semibold text-foreground">
              Not Professional Advice
            </h2>
            <p>
              Calculatories provides informational tools only. Our calculators and
              articles do not constitute financial, medical, or legal advice.
              Always consult a licensed professional for decisions affecting your
              health, finances, or legal rights.
            </p>

            <p>
              See also our{" "}
              <Link href="/methodology" className="text-primary hover:underline">
                methodology
              </Link>{" "}
              page for details on how we source and verify data.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
