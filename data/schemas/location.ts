import { z } from "zod";

export const LocationVariantSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["state", "city", "segment"]),
  toolSlug: z.string().min(1),
  categorySlug: z.string().min(1),
  localizedData: z.object({
    medianHomePrice: z.number().positive(),
    propertyTaxRate: z.number().nonnegative(),
    avgMortgageRate: z.number().positive().optional(),
    source: z.string().min(1),
    sourceUrl: z.string().url(),
    asOf: z.string().min(1),
  }),
  intro: z.string().min(1),
});

export type LocationVariant = z.infer<typeof LocationVariantSchema>;
