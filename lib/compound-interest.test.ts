import { describe, expect, it } from "vitest";
import {
  calculateCompoundInterest,
  isValidCompoundInterestInput,
} from "@/lib/compound-interest";

describe("isValidCompoundInterestInput", () => {
  it("rejects negative years", () => {
    expect(
      isValidCompoundInterestInput({
        principal: 10000,
        annualRatePercent: 5,
        years: -1,
        compoundingFrequency: "annually",
      }),
    ).toBe(false);
  });
});

describe("calculateCompoundInterest", () => {
  it("computes $10,000 @ 5% annually for 10 years", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRatePercent: 5,
      years: 10,
      compoundingFrequency: "annually",
    });
    expect(result).not.toBeNull();
    expect(result!.futureValue).toBeCloseTo(16288.95, 0);
    expect(result!.totalInterestEarned).toBeCloseTo(6288.95, 0);
  });

  it("handles 0% rate with no growth", () => {
    const result = calculateCompoundInterest({
      principal: 5000,
      annualRatePercent: 0,
      years: 5,
      compoundingFrequency: "monthly",
    });
    expect(result).not.toBeNull();
    expect(result!.futureValue).toBe(5000);
    expect(result!.totalInterestEarned).toBe(0);
  });

  it("computes with monthly contributions over 20 years", () => {
    const result = calculateCompoundInterest({
      principal: 1000,
      annualRatePercent: 6,
      years: 20,
      compoundingFrequency: "monthly",
      monthlyContribution: 100,
    });
    expect(result).not.toBeNull();
    expect(result!.futureValue).toBeCloseTo(49514.29, 0);
    expect(result!.totalContributions).toBe(24000);
  });

  it("monthly compounding yields higher FV than annual at same rate", () => {
    const base = {
      principal: 10000,
      annualRatePercent: 7,
      years: 10,
    };
    const monthly = calculateCompoundInterest({
      ...base,
      compoundingFrequency: "monthly",
    });
    const annual = calculateCompoundInterest({
      ...base,
      compoundingFrequency: "annually",
    });
    expect(monthly!.futureValue).toBeGreaterThan(annual!.futureValue);
  });

  it("returns null for invalid principal", () => {
    expect(
      calculateCompoundInterest({
        principal: 0,
        annualRatePercent: 5,
        years: 10,
        compoundingFrequency: "annually",
      }),
    ).toBeNull();
  });
});
