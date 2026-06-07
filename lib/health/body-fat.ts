import { cmToIn } from "@/lib/health/units";
import { isValidBodyFatInput } from "@/lib/health/validate";
import type { BodyFatInput } from "@/lib/health/types";
import { round1 } from "@/lib/health/units";

export interface BodyFatResult {
  bodyFatPercent: number;
  leanMassKg: number;
  fatMassKg: number;
}

/** US Navy circumference method (body fat %). */
export function calculateBodyFatPercent(input: BodyFatInput): BodyFatResult | null {
  if (!isValidBodyFatInput(input)) return null;

  const heightIn = cmToIn(input.heightCm);
  const neckIn = cmToIn(input.neckCm);
  const waistIn = cmToIn(input.waistCm);

  let bodyFatPercent: number;

  if (input.sex === "male") {
    if (waistIn <= neckIn) return null;
    const logVal =
      1.0324 -
      0.19077 * Math.log10(waistIn - neckIn) +
      0.15456 * Math.log10(heightIn);
    if (logVal <= 0) return null;
    bodyFatPercent = 495 / logVal - 450;
  } else {
    const hipIn = cmToIn(input.hipCm ?? 0);
    const sum = waistIn + hipIn - neckIn;
    if (sum <= 0) return null;
    const logVal =
      1.29579 -
      0.35004 * Math.log10(sum) +
      0.221 * Math.log10(heightIn);
    if (logVal <= 0) return null;
    bodyFatPercent = 495 / logVal - 450;
  }

  if (!Number.isFinite(bodyFatPercent) || bodyFatPercent < 0 || bodyFatPercent > 60) {
    return null;
  }

  const pct = round1(bodyFatPercent);
  const fatMassKg = round1((input.weightKg * pct) / 100);
  const leanMassKg = round1(input.weightKg - fatMassKg);

  return {
    bodyFatPercent: pct,
    leanMassKg,
    fatMassKg,
  };
}
