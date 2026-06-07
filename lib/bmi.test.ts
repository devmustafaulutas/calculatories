import { describe, expect, it } from "vitest";
import { calculateBmiFromMetric } from "@/lib/bmi";
import { ftInToCm, lbToKg } from "@/lib/health/units";

describe("bmi wrapper", () => {
  it("re-exports calculateBmiFromMetric", () => {
    const r = calculateBmiFromMetric(ftInToCm(5, 10), lbToKg(180));
    expect(r!.bmi).toBeCloseTo(25.8, 0);
  });
});
