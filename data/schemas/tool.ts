import { z } from "zod";

export const ToolStatusSchema = z.enum(["live", "draft"]);
export const SchemaTypeSchema = z.enum(["WebApplication", "SoftwareApplication"]);
export const UnitSystemSchema = z.enum(["imperial", "metric", "both", "none"]);

export const ToolSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
  name: z.string().min(1),
  h1: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  primaryKeyword: z.string().min(1),
  lsiKeywords: z.array(z.string()),
  relatedToolSlugs: z.array(z.string()),
  schemaType: SchemaTypeSchema,
  unitSystem: UnitSystemSchema,
  status: ToolStatusSchema,
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1),
  reviewedBy: z.string().min(1),
  authorId: z.string().min(1),
  isYMYL: z.boolean(),
  featured: z.boolean().optional(),
  icon: z.string().min(1),
  programmatic: z.boolean().optional(),
  sharedCore: z.string().optional(),
});

export type Tool = z.infer<typeof ToolSchema>;
export type ToolStatus = z.infer<typeof ToolStatusSchema>;
