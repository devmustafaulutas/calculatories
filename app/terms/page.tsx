import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumb } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for Calculatories.com. Information about using our free online calculators and website content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ label: "Terms of Use" }])} />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ label: "Terms of Use" }]} />
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>Last updated: June 1, 2025</p>
            <p>
              By using Calculatories.com, you agree to these terms. Our
              calculators and content are provided for informational purposes only
              and do not constitute professional financial, medical, or legal
              advice.
            </p>
            <p>
              You may use our calculators freely for personal, non-commercial
              purposes. We make no warranties about accuracy beyond our stated
              methodology. Always verify important calculations with a qualified
              professional.
            </p>
            <p>
              Calculatories is not liable for decisions made based on calculator
              results. We reserve the right to modify or discontinue any tool or
              content at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
