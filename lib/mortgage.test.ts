import { describe, expect, it } from "vitest";
import {
  calculateMortgage,
  generateFullAmortizationSchedule,
  isValidMortgageInput,
  roundToCents,
} from "@/lib/mortgage";

describe("isValidMortgageInput", () => {
  it("rejects NaN and invalid inputs", () => {
    expect(
      isValidMortgageInput({
        homePrice: NaN,
        downPayment: 70000,
        annualRate: 6.5,
        termYears: 30,
      }),
    ).toBe(false);
    expect(
      isValidMortgageInput({
        homePrice: 350000,
        downPayment: 400000,
        annualRate: 6.5,
        termYears: 30,
      }),
    ).toBe(false);
    expect(
      isValidMortgageInput({
        homePrice: 350000,
        downPayment: 350000,
        annualRate: 6.5,
        termYears: 30,
      }),
    ).toBe(false);
  });

  it("accepts valid inputs including 0% rate", () => {
    expect(
      isValidMortgageInput({
        homePrice: 350000,
        downPayment: 70000,
        annualRate: 0,
        termYears: 30,
      }),
    ).toBe(true);
  });
});

describe("calculateMortgage", () => {
  it("computes standard 30-year payment (~$1,769.82)", () => {
    const result = calculateMortgage({
      homePrice: 350000,
      downPayment: 70000,
      annualRate: 6.5,
      termYears: 30,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(1769.82, 1);
    expect(result!.principal).toBe(280000);
  });

  it("computes standard 15-year payment (~$2,441.12)", () => {
    const result = calculateMortgage({
      homePrice: 350000,
      downPayment: 70000,
      annualRate: 6.5,
      termYears: 15,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(2439.1, 0);
  });

  it("handles 0% interest rate (M = P/n)", () => {
    const result = calculateMortgage({
      homePrice: 200000,
      downPayment: 40000,
      annualRate: 0,
      termYears: 30,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(444.44, 2);
    expect(result!.totalInterest).toBe(0);
  });

  it("computes 10-year 3% loan", () => {
    const result = calculateMortgage({
      homePrice: 100000,
      downPayment: 20000,
      annualRate: 3,
      termYears: 10,
    });
    expect(result).not.toBeNull();
    expect(result!.principal).toBe(80000);
    expect(result!.monthlyPayment).toBeGreaterThan(700);
    expect(result!.monthlyPayment).toBeLessThan(800);
  });

  it("returns null for invalid inputs", () => {
    expect(
      calculateMortgage({
        homePrice: 100000,
        downPayment: 150000,
        annualRate: 5,
        termYears: 30,
      }),
    ).toBeNull();
    expect(
      calculateMortgage({
        homePrice: 350000,
        downPayment: 70000,
        annualRate: NaN,
        termYears: 30,
      }),
    ).toBeNull();
  });
});

describe("generateFullAmortizationSchedule", () => {
  it("reduces balance to zero at end of term", () => {
    const input = {
      homePrice: 350000,
      downPayment: 70000,
      annualRate: 6.5,
      termYears: 30,
    };
    const schedule = generateFullAmortizationSchedule(input);
    expect(schedule).toHaveLength(360);
    expect(schedule[359].balance).toBe(0);
    expect(schedule[359].month).toBe(360);
  });

  it("has zero interest for 0% rate loans", () => {
    const schedule = generateFullAmortizationSchedule({
      homePrice: 200000,
      downPayment: 40000,
      annualRate: 0,
      termYears: 30,
    });
    expect(schedule.every((row) => row.interest === 0)).toBe(true);
    expect(schedule[359].balance).toBe(0);
  });
});

describe("roundToCents", () => {
  it("rounds to two decimal places", () => {
    expect(roundToCents(1769.824)).toBe(1769.82);
    expect(roundToCents(0.005)).toBe(0.01);
  });
});
