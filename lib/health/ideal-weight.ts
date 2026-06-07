import { isValidAnthropometric } from "@/lib/health/validate";
import type { AnthropometricInput, Sex } from "@/lib/health/types";
import { round1 } from "@/lib/health/units";
import { cmToIn } from "@/lib/health/units";

const BMI_MIN = 18.5;
const BMI_MAX = 24.9;

export interface IdealWeightResult {
  minKg: number;
  maxKg: number;
  midpointKg: number;
  devineKg: number;
}

/** Devine formula (1974) ideal weight in kg. */
export function calculateDevineWeightKg(sex: Sex, heightCm: number): number {
  const heightIn = cmToIn(heightCm);
  const inchesOver5ft = Math.max(0, heightIn - 60);
  const lb =
    sex === "male"
      ? 110 + 5.2046 * inchesOver5ft
      : 100.3 + 4.5359 * inchesOver5ft;
  return round1(lb / 2.2046226218);
}

export function calculateIdealWeight(input: AnthropometricInput): IdealWeightResult | null {
  if (!isValidAnthropometric(input)) return null;

  const heightM = input.heightCm / 100;
  const heightMSq = heightM * heightM;
  const minKg = round1(BMI_MIN * heightMSq);
  const maxKg = round1(BMI_MAX * heightMSq);
  const midpointKg = round1((minKg + maxKg) / 2);
  const devineKg = calculateDevineWeightKg(input.sex, input.heightCm);

  return { minKg, maxKg, midpointKg, devineKg };
}
