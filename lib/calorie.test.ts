import { describe, expect, it } from "vitest";
import { calculateCalories } from "@/lib/calorie";
import { ftInToCm, lbToKg } from "@/lib/health/units";

const base = {
  sex: "male" as const,
  age: 30,
  heightCm: ftInToCm(5, 10),
  weightKg: lbToKg(180),
  activity: "moderate" as const,
  goal: "maintain" as const,
};

describe("calculateCalories (lib/calorie)", () => {
  it("TDEE equals BMR × 1.55 for moderate activity", () => {
    const result = calculateCalories(base);
    expect(result).not.toBeNull();
    expect(result!.tdee).toBe(Math.round(result!.bmr * 1.55));
  });

  it("lose goal subtracts 500 kcal from TDEE", () => {
    const maintain = calculateCalories({ ...base, goal: "maintain" });
    const lose = calculateCalories({ ...base, goal: "lose" });
    expect(lose!.goalCalories).toBe(maintain!.tdee - 500);
  });

  it("gain goal adds 500 kcal to TDEE", () => {
    const maintain = calculateCalories({
      ...base,
      activity: "sedentary",
      goal: "maintain",
    });
    const gain = calculateCalories({
      ...base,
      activity: "sedentary",
      goal: "gain",
    });
    expect(gain!.goalCalories).toBe(maintain!.tdee + 500);
  });

  it("very active exceeds sedentary TDEE", () => {
    const sedentary = calculateCalories({
      ...base,
      activity: "sedentary",
    });
    const veryActive = calculateCalories({
      ...base,
      activity: "veryActive",
    });
    expect(veryActive!.tdee).toBeGreaterThan(sedentary!.tdee);
  });

  it("returns null for invalid anthropometric input", () => {
    expect(calculateCalories({ ...base, age: 5 })).toBeNull();
  });
});
