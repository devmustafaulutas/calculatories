import { calculateBmr } from "@/lib/health/bmr";
import type { ActivityLevel, AnthropometricInput, CalorieGoal } from "@/lib/health/types";
import { round0 } from "@/lib/health/units";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (1–3 days/week)",
  moderate: "Moderately active (3–5 days/week)",
  active: "Very active (6–7 days/week)",
  veryActive: "Extra active (physical job or 2× training)",
};

const GOAL_ADJUSTMENT: Record<CalorieGoal, number> = {
  maintain: 0,
  lose: -500,
  gain: 500,
};

export interface TdeeResult {
  bmr: number;
  tdee: number;
  goalCalories: number;
  activityMultiplier: number;
}

export function calculateTdee(
  input: AnthropometricInput,
  activity: ActivityLevel,
  goal: CalorieGoal = "maintain",
): TdeeResult | null {
  const bmr = calculateBmr(input);
  if (bmr === null) return null;

  const multiplier = ACTIVITY_MULTIPLIERS[activity];
  const tdee = round0(bmr * multiplier);
  const goalCalories = round0(tdee + GOAL_ADJUSTMENT[goal]);

  return {
    bmr,
    tdee,
    goalCalories: Math.max(goalCalories, 1200),
    activityMultiplier: multiplier,
  };
}
