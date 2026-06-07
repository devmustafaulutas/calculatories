import { isValidAnthropometric } from "@/lib/health/validate";
import type { AnthropometricInput } from "@/lib/health/types";
import { round0 } from "@/lib/health/units";

/** Mifflin-St Jeor (1990) basal metabolic rate in kcal/day. */
export function calculateBmr(input: AnthropometricInput): number | null {
  if (!isValidAnthropometric(input)) return null;

  const { sex, age, heightCm, weightKg } = input;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = sex === "male" ? base + 5 : base - 161;

  return round0(bmr);
}
