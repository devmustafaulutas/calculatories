import { describe, expect, it } from "vitest";
import {
  calculateLoanRepayment,
  generateFullLoanRepaymentSchedule,
  isValidLoanRepaymentInput,
} from "@/lib/loan-repayment";

describe("calculateLoanRepayment", () => {
  it("computes $25,000 @ 8% for 5 years", () => {
    const result = calculateLoanRepayment({
      loanAmount: 25000,
      annualRatePercent: 8,
      termYears: 5,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(507, 0);
    expect(result!.principal).toBe(25000);
  });

  it("handles 0% interest rate", () => {
    const result = calculateLoanRepayment({
      loanAmount: 25000,
      annualRatePercent: 0,
      termYears: 5,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(416.67, 1);
    expect(result!.totalInterest).toBe(0);
  });

  it("matches mortgage principal scenario ($280k @ 6.5%, 30yr)", () => {
    const result = calculateLoanRepayment({
      loanAmount: 280000,
      annualRatePercent: 6.5,
      termYears: 30,
    });
    expect(result).not.toBeNull();
    expect(result!.monthlyPayment).toBeCloseTo(1769.82, 1);
  });

  it("shortens term with extra monthly payment", () => {
    const result = calculateLoanRepayment({
      loanAmount: 25000,
      annualRatePercent: 8,
      termYears: 5,
      extraMonthlyPayment: 100,
    });
    expect(result).not.toBeNull();
    expect(result!.payoffMonths).toBeLessThan(60);
    const schedule = generateFullLoanRepaymentSchedule({
      loanAmount: 25000,
      annualRatePercent: 8,
      termYears: 5,
      extraMonthlyPayment: 100,
    });
    expect(schedule[schedule.length - 1].balance).toBe(0);
  });

  it("returns null for invalid loan amount", () => {
    expect(
      calculateLoanRepayment({
        loanAmount: -1000,
        annualRatePercent: 5,
        termYears: 5,
      }),
    ).toBeNull();
    expect(
      isValidLoanRepaymentInput({
        loanAmount: 0,
        annualRatePercent: 5,
        termYears: 5,
      }),
    ).toBe(false);
  });
});
