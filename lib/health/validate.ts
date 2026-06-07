import type { AnthropometricInput, BodyFatInput } from "@/lib/health/types";

const MIN_AGE = 15;
const MAX_AGE = 120;
const MIN_HEIGHT_CM = 100;
const MAX_HEIGHT_CM = 250;
const MIN_WEIGHT_KG = 30;
const MAX_WEIGHT_KG = 300;
const MIN_CIRCUMFERENCE_CM = 20;
const MAX_CIRCUMFERENCE_CM = 200;

export function isValidAnthropometric(input: AnthropometricInput): boolean {
  const { age, heightCm, weightKg } = input;
  if (
    !Number.isFinite(age) ||
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg)
  ) {
    return false;
  }
  if (age < MIN_AGE || age > MAX_AGE) return false;
  if (heightCm < MIN_HEIGHT_CM || heightCm > MAX_HEIGHT_CM) return false;
  if (weightKg < MIN_WEIGHT_KG || weightKg > MAX_WEIGHT_KG) return false;
  return true;
}

export function isValidBodyFatInput(input: BodyFatInput): boolean {
  if (!isValidAnthropometric(input)) return false;
  const { neckCm, waistCm, hipCm, sex } = input;
  if (!Number.isFinite(neckCm) || !Number.isFinite(waistCm)) return false;
  if (neckCm < MIN_CIRCUMFERENCE_CM || neckCm > MAX_CIRCUMFERENCE_CM) {
    return false;
  }
  if (waistCm < MIN_CIRCUMFERENCE_CM || waistCm > MAX_CIRCUMFERENCE_CM) {
    return false;
  }
  if (sex === "female") {
    if (hipCm === undefined || !Number.isFinite(hipCm)) return false;
    if (hipCm < MIN_CIRCUMFERENCE_CM || hipCm > MAX_CIRCUMFERENCE_CM) {
      return false;
    }
  }
  return true;
}
