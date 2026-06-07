import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  intro: z.string().min(1),
  icon: z.string().min(1),
  parent: z.string().nullable(),
  order: z.number().int().nonnegative(),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export type Category = z.infer<typeof CategorySchema>;
