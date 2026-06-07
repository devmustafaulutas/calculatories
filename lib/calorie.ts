import {
  calculateTdee,
  ACTIVITY_LABELS,
  ACTIVITY_MULTIPLIERS,
  type TdeeResult,
} from "@/lib/health/tdee";
import type { ActivityLevel, AnthropometricInput, CalorieGoal } from "@/lib/health/types";

export interface CalorieInput extends AnthropometricInput {
  activity: ActivityLevel;
  goal: CalorieGoal;
}

export { ACTIVITY_LABELS, ACTIVITY_MULTIPLIERS, type TdeeResult };

export function calculateCalories(input: CalorieInput): TdeeResult | null {
  return calculateTdee(input, input.activity, input.goal);
}
