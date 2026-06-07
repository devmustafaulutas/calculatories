import { calculateMacros, MACRO_PRESETS, type MacroResult } from "@/lib/health/macro";
import type {
  ActivityLevel,
  AnthropometricInput,
  CalorieGoal,
  MacroPreset,
} from "@/lib/health/types";

export interface MacroInput extends AnthropometricInput {
  activity: ActivityLevel;
  goal: CalorieGoal;
  preset: MacroPreset;
}

export { MACRO_PRESETS, type MacroResult };

export function calculateMacroPlan(input: MacroInput): MacroResult | null {
  return calculateMacros(input, input.activity, input.goal, input.preset);
}
