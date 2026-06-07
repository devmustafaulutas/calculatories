import { describe, expect, it } from "vitest";
import {
  calculateDevineWeightKg,
  calculateIdealWeight,
} from "@/lib/health/ideal-weight";
import { ftInToCm } from "@/lib/health/units";

describe("calculateIdealWeight", () => {
  const input = {
    sex: "male" as const,
    age: 30,
    heightCm: ftInToCm(5, 10),
    weightKg: 80,
  };

  it("returns min < max healthy weight range", () => {
    const result = calculateIdealWeight(input);
    expect(result).not.toBeNull();
    expect(result!.minKg).toBeLessThan(result!.maxKg);
    expect(result!.midpointKg).toBeCloseTo(
      (result!.minKg + result!.maxKg) / 2,
      0,
    );
  });

  it("Devine formula returns plausible weight for 5'10\" male", () => {
    expect(calculateDevineWeightKg("male", ftInToCm(5, 10))).toBeCloseTo(73.5, 0);
  });

  it("female Devine is lower than male at same height", () => {
    const h = ftInToCm(5, 6);
    expect(calculateDevineWeightKg("female", h)).toBeLessThan(
      calculateDevineWeightKg("male", h),
    );
  });

  it("taller person has higher ideal range", () => {
    const short = calculateIdealWeight({ ...input, heightCm: ftInToCm(5, 4) });
    const tall = calculateIdealWeight({ ...input, heightCm: ftInToCm(6, 2) });
    expect(tall!.maxKg).toBeGreaterThan(short!.maxKg);
  });

  it("returns null for invalid height", () => {
    expect(calculateIdealWeight({ ...input, heightCm: 50 })).toBeNull();
  });
});
