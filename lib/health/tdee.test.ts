import { describe, expect, it } from "vitest";
import { calculateTdee } from "@/lib/health/tdee";
import { ftInToCm, lbToKg } from "@/lib/health/units";

const base = {
  sex: "male" as const,
  age: 30,
  heightCm: ftInToCm(5, 10),
  weightKg: lbToKg(180),
};

describe("calculateTdee", () => {
  it("TDEE equals BMR × 1.55 for moderate activity", () => {
    const result = calculateTdee(base, "moderate");
    expect(result).not.toBeNull();
    expect(result!.tdee).toBe(Math.round(result!.bmr * 1.55));
  });

  it("lose goal subtracts 500 kcal", () => {
    const maintain = calculateTdee(base, "moderate", "maintain");
    const lose = calculateTdee(base, "moderate", "lose");
    expect(lose!.goalCalories).toBe(maintain!.tdee - 500);
  });

  it("gain goal adds 500 kcal", () => {
    const maintain = calculateTdee(base, "sedentary", "maintain");
    const gain = calculateTdee(base, "sedentary", "gain");
    expect(gain!.goalCalories).toBe(maintain!.tdee + 500);
  });

  it("very active exceeds sedentary TDEE", () => {
    const sedentary = calculateTdee(base, "sedentary");
    const veryActive = calculateTdee(base, "veryActive");
    expect(veryActive!.tdee).toBeGreaterThan(sedentary!.tdee);
  });

  it("returns null for invalid input", () => {
    expect(calculateTdee({ ...base, age: 5 }, "moderate")).toBeNull();
  });
});
