import { LocationVariantSchema, type LocationVariant } from "@/data/schemas/location";
import { assertValidArray } from "@/lib/validate";

const rawLocations: LocationVariant[] = [
  {
    slug: "new-york",
    name: "New York",
    type: "state",
    toolSlug: "mortgage-calculator",
    categorySlug: "finance",
    localizedData: {
      medianHomePrice: 485000,
      propertyTaxRate: 1.62,
      avgMortgageRate: 6.85,
      source: "US Census ACS 2023",
      sourceUrl: "https://www.census.gov/programs-surveys/acs",
      asOf: "2024",
    },
    intro:
      "New York has one of the highest median home prices in the nation, with a statewide median of approximately $485,000 as of 2024. Property tax rates average 1.62% of assessed value, though rates vary significantly between NYC boroughs and upstate counties. Use this localized mortgage calculator to estimate payments based on New York market conditions.",
  },
  {
    slug: "california",
    name: "California",
    type: "state",
    toolSlug: "mortgage-calculator",
    categorySlug: "finance",
    localizedData: {
      medianHomePrice: 785000,
      propertyTaxRate: 0.75,
      avgMortgageRate: 6.92,
      source: "US Census ACS 2023",
      sourceUrl: "https://www.census.gov/programs-surveys/acs",
      asOf: "2024",
    },
    intro:
      "California's median home price exceeds $785,000, making it the most expensive state for homebuyers. Thanks to Proposition 13, effective property tax rates average around 0.75%, but high purchase prices mean substantial monthly payments. This California mortgage calculator uses localized data to help you plan.",
  },
];

export const locations: LocationVariant[] = assertValidArray(
  LocationVariantSchema,
  rawLocations,
  "locations",
);
