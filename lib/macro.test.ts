import { describe, expect, it } from "vitest";
import { calculateMacroPlan, MACRO_PRESETS } from "@/lib/macro";
import { ftInToCm, lbToKg } from "@/lib/health/units";

const base = {
  sex: "male" as const,
  age: 30,
  heightCm: ftInToCm(5, 10),
  weightKg: lbToKg(180),
  activity: "moderate" as const,
  goal: "maintain" as const,
  preset: "balanced" as const,
};

describe("calculateMacroPlan wrapper", () => {
  it("returns macros for full pipeline", () => {
    const result = calculateMacroPlan(base);
    expect(result).not.toBeNull();
    expect(result!.macros.proteinG).toBeGreaterThan(0);
    expect(result!.calories).toBe(result!.tdee);
  });

  it("high protein preset has more protein than balanced", () => {
    const balanced = calculateMacroPlan({ ...base, preset: "balanced" });
    const high = calculateMacroPlan({ ...base, preset: "highProtein" });
    expect(high!.macros.proteinG).toBeGreaterThan(balanced!.macros.proteinG);
  });

  it("cut goal lowers calories vs maintain", () => {
    const maintain = calculateMacroPlan({ ...base, goal: "maintain" });
    const cut = calculateMacroPlan({ ...base, goal: "lose" });
    expect(cut!.calories).toBeLessThan(maintain!.calories);
  });

  it("exports balanced preset splits", () => {
    expect(MACRO_PRESETS.balanced).toEqual({
      proteinPercent: 30,
      carbsPercent: 40,
      fatPercent: 30,
    });
  });

  it("returns null for invalid age", () => {
    expect(calculateMacroPlan({ ...base, age: 10 })).toBeNull();
  });
});
