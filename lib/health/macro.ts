import { calculateTdee } from "@/lib/health/tdee";
import type {
  ActivityLevel,
  AnthropometricInput,
  CalorieGoal,
  MacroPreset,
  MacroSplit,
} from "@/lib/health/types";
import { round0 } from "@/lib/health/units";

export const MACRO_PRESETS: Record<MacroPreset, MacroSplit> = {
  balanced: { proteinPercent: 30, carbsPercent: 40, fatPercent: 30 },
  highProtein: { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
  lowCarb: { proteinPercent: 30, carbsPercent: 20, fatPercent: 50 },
};

export interface MacroGrams {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface MacroResult {
  calories: number;
  tdee: number;
  bmr: number;
  macros: MacroGrams;
  preset: MacroPreset;
}

export function calculateMacroGrams(
  calories: number,
  split: MacroSplit,
): MacroGrams {
  return {
    proteinG: round0((calories * split.proteinPercent) / 100 / 4),
    carbsG: round0((calories * split.carbsPercent) / 100 / 4),
    fatG: round0((calories * split.fatPercent) / 100 / 9),
  };
}

export function calculateMacros(
  input: AnthropometricInput,
  activity: ActivityLevel,
  goal: CalorieGoal,
  preset: MacroPreset,
): MacroResult | null {
  const tdeeResult = calculateTdee(input, activity, goal);
  if (tdeeResult === null) return null;

  const split = MACRO_PRESETS[preset];
  const macros = calculateMacroGrams(tdeeResult.goalCalories, split);

  return {
    calories: tdeeResult.goalCalories,
    tdee: tdeeResult.tdee,
    bmr: tdeeResult.bmr,
    macros,
    preset,
  };
}
