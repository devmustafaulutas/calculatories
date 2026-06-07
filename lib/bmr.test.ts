import { describe, expect, it } from "vitest";
import { calculateBmr } from "@/lib/bmr";
import { ftInToCm, lbToKg } from "@/lib/health/units";

describe("calculateBmr (lib/bmr)", () => {
  const male30 = {
    sex: "male" as const,
    age: 30,
    heightCm: ftInToCm(5, 10),
    weightKg: lbToKg(180),
  };

  it("computes Mifflin-St Jeor for 30y male 5'10\" 180 lb", () => {
    expect(calculateBmr(male30)).toBeCloseTo(1783, 0);
  });

  it("female BMR is lower than male at same stats", () => {
    const female = { ...male30, sex: "female" as const };
    expect(calculateBmr(female)).toBeLessThan(calculateBmr(male30)!);
  });

  it("BMR increases with weight", () => {
    const heavier = { ...male30, weightKg: lbToKg(200) };
    expect(calculateBmr(heavier)!).toBeGreaterThan(calculateBmr(male30)!);
  });

  it("BMR decreases with age", () => {
    const older = { ...male30, age: 50 };
    expect(calculateBmr(older)!).toBeLessThan(calculateBmr(male30)!);
  });

  it("returns null for invalid age", () => {
    expect(calculateBmr({ ...male30, age: 10 })).toBeNull();
  });
});
