import { describe, expect, it } from "vitest";
import { calculateMacroGrams, calculateMacros } from "@/lib/health/macro";
import { ftInToCm, lbToKg } from "@/lib/health/units";

const base = {
  sex: "male" as const,
  age: 30,
  heightCm: ftInToCm(5, 10),
  weightKg: lbToKg(180),
};

describe("calculateMacroGrams", () => {
  it("splits 2000 kcal balanced 30/40/30", () => {
    const macros = calculateMacroGrams(2000, {
      proteinPercent: 30,
      carbsPercent: 40,
      fatPercent: 30,
    });
    expect(macros.proteinG).toBe(150);
    expect(macros.carbsG).toBe(200);
    expect(macros.fatG).toBe(67);
  });

  it("fat uses 9 kcal per gram", () => {
    const macros = calculateMacroGrams(900, {
      proteinPercent: 0,
      carbsPercent: 0,
      fatPercent: 100,
    });
    expect(macros.fatG).toBe(100);
  });
});

describe("calculateMacros", () => {
  it("returns macros for full pipeline", () => {
    const result = calculateMacros(base, "moderate", "maintain", "balanced");
    expect(result).not.toBeNull();
    expect(result!.macros.proteinG).toBeGreaterThan(0);
    expect(result!.calories).toBe(result!.tdee);
  });

  it("high protein preset has more protein than balanced", () => {
    const balanced = calculateMacros(base, "moderate", "maintain", "balanced");
    const high = calculateMacros(base, "moderate", "maintain", "highProtein");
    expect(high!.macros.proteinG).toBeGreaterThan(balanced!.macros.proteinG);
  });

  it("cut goal lowers calories vs maintain", () => {
    const maintain = calculateMacros(base, "moderate", "maintain", "balanced");
    const cut = calculateMacros(base, "moderate", "lose", "balanced");
    expect(cut!.calories).toBeLessThan(maintain!.calories);
  });
});
