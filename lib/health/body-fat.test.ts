import { describe, expect, it } from "vitest";
import { calculateBodyFatPercent } from "@/lib/health/body-fat";
import { inToCm, ftInToCm, lbToKg } from "@/lib/health/units";

describe("calculateBodyFatPercent", () => {
  const maleInput = {
    sex: "male" as const,
    age: 30,
    heightCm: ftInToCm(5, 10),
    weightKg: lbToKg(180),
    neckCm: inToCm(15),
    waistCm: inToCm(36),
  };

  it("computes male body fat % in plausible range", () => {
    const result = calculateBodyFatPercent(maleInput);
    expect(result).not.toBeNull();
    expect(result!.bodyFatPercent).toBeGreaterThan(10);
    expect(result!.bodyFatPercent).toBeLessThan(35);
  });

  it("lean + fat mass equals total weight", () => {
    const result = calculateBodyFatPercent(maleInput)!;
    expect(result.leanMassKg + result.fatMassKg).toBeCloseTo(maleInput.weightKg, 0);
  });

  it("returns null when waist ≤ neck (male)", () => {
    expect(
      calculateBodyFatPercent({ ...maleInput, waistCm: inToCm(14) }),
    ).toBeNull();
  });

  it("requires hip for female", () => {
    const female = {
      ...maleInput,
      sex: "female" as const,
      waistCm: inToCm(32),
      hipCm: inToCm(40),
    };
    expect(calculateBodyFatPercent({ ...female, hipCm: undefined })).toBeNull();
    expect(calculateBodyFatPercent(female)).not.toBeNull();
  });

  it("returns null for invalid anthropometrics", () => {
    expect(calculateBodyFatPercent({ ...maleInput, age: 10 })).toBeNull();
  });
});
