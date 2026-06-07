import type { ZodSchema } from "zod";

export function assertValid<T>(schema: ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`[${label}] validation failed: ${issues}`);
  }
  return result.data;
}

export function assertValidArray<T>(
  schema: ZodSchema<T>,
  data: unknown[],
  label: string,
): T[] {
  return data.map((item, index) => assertValid(schema, item, `${label}[${index}]`));
}
