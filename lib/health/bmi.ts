import { round1 } from "@/lib/health/units";

export type BmiCategory =
  | "Underweight"
  | "Normal"
  | "Overweight"
  | "Obese I"
  | "Obese II"
  | "Obese III";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
}

const BMI_MIN_HEALTHY = 18.5;
const BMI_MAX_HEALTHY = 24.9;

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese I";
  if (bmi < 40) return "Obese II";
  return "Obese III";
}

export function calculateBmiFromMetric(
  heightCm: number,
  weightKg: number,
): BmiResult | null {
  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = round1(weightKg / (heightM * heightM));
  const heightMSq = heightM * heightM;

  return {
    bmi,
    category: getBmiCategory(bmi),
    healthyWeightMinKg: round1(BMI_MIN_HEALTHY * heightMSq),
    healthyWeightMaxKg: round1(BMI_MAX_HEALTHY * heightMSq),
  };
}
