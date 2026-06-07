import { describe, expect, it } from "vitest";
import { calculateBmiFromMetric, getBmiCategory } from "@/lib/health/bmi";
import { ftInToCm, inToCm, lbToKg } from "@/lib/health/units";

describe("calculateBmiFromMetric", () => {
  it("computes BMI for 5'10\" 154 lb (~22.1)", () => {
    const result = calculateBmiFromMetric(ftInToCm(5, 10), lbToKg(154));
    expect(result).not.toBeNull();
    expect(result!.bmi).toBeCloseTo(22.1, 0);
    expect(result!.category).toBe("Normal");
  });

  it("classifies overweight at BMI 27", () => {
    expect(getBmiCategory(27)).toBe("Overweight");
  });

  it("returns healthy weight range", () => {
    const result = calculateBmiFromMetric(170, 70);
    expect(result!.healthyWeightMinKg).toBeGreaterThan(0);
    expect(result!.healthyWeightMaxKg).toBeGreaterThan(result!.healthyWeightMinKg);
  });

  it("returns null for zero height", () => {
    expect(calculateBmiFromMetric(0, 70)).toBeNull();
  });

  it("returns null for negative weight", () => {
    expect(calculateBmiFromMetric(170, -1)).toBeNull();
  });
});
