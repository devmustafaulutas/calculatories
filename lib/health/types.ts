export type Sex = "male" | "female";

export type UnitSystem = "metric" | "imperial";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive";

export type CalorieGoal = "maintain" | "lose" | "gain";

export type MacroPreset = "balanced" | "highProtein" | "lowCarb";

export interface AnthropometricInput {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
}

export interface BodyFatInput extends AnthropometricInput {
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}

export interface MacroSplit {
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
}
