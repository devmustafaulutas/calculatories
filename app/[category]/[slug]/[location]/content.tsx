import Link from "next/link";
import { Citation } from "@/components/seo/Citation";
import { InContentAd } from "@/components/ads/InContentAd";
import type { LocationVariant } from "@/data/schemas/location";
import { formatUSD } from "@/lib/mortgage";
import { locationPath, toolPath } from "@/lib/urls";

interface LocationContentProps {
  variant: LocationVariant;
  siblingLocations: LocationVariant[];
  baseContent: React.ReactNode;
}

export function LocationContent({
  variant,
  siblingLocations,
  baseContent,
}: LocationContentProps) {
  const { localizedData: data } = variant;

  return (
    <article>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {variant.name} Housing Market Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {variant.intro}
        </p>
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Median Home Price</p>
            <p className="text-xl font-bold">
              {formatUSD(data.medianHomePrice)}
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Property Tax Rate</p>
            <p className="text-xl font-bold">{data.propertyTaxRate}%</p>
          </div>
          {data.avgMortgageRate && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Avg. Mortgage Rate</p>
              <p className="text-xl font-bold">{data.avgMortgageRate}%</p>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Data source:{" "}
          <Citation label={data.source} url={data.sourceUrl} /> (as of{" "}
          {data.asOf}).
        </p>
      </section>

      <InContentAd />

      {siblingLocations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Other Locations</h2>
          <ul className="flex flex-wrap gap-3">
            {siblingLocations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={locationPath(
                    loc.categorySlug,
                    loc.toolSlug,
                    loc.slug,
                  )}
                  className="text-primary hover:underline"
                >
                  {loc.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={toolPath(variant.categorySlug, variant.toolSlug)}
                className="text-primary hover:underline"
              >
                National calculator
              </Link>
            </li>
          </ul>
        </section>
      )}

      {baseContent}
    </article>
  );
}
