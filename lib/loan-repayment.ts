import {
  calculatePeriodicPayment,
  generateLoanSchedule,
  type AmortizationRow,
} from "@/lib/finance/amortization";

export type { AmortizationRow };

export interface LoanRepaymentInput {
  loanAmount: number;
  annualRatePercent: number;
  termYears: number;
  extraMonthlyPayment?: number;
}

export interface LoanRepaymentResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  payoffMonths: number;
  principal: number;
}

export function isValidLoanRepaymentInput(
  input: LoanRepaymentInput,
): boolean {
  const extra = input.extraMonthlyPayment ?? 0;

  if (
    !Number.isFinite(input.loanAmount) ||
    !Number.isFinite(input.annualRatePercent) ||
    !Number.isFinite(input.termYears) ||
    !Number.isFinite(extra)
  ) {
    return false;
  }

  if (
    input.loanAmount <= 0 ||
    input.annualRatePercent < 0 ||
    input.termYears <= 0 ||
    extra < 0
  ) {
    return false;
  }

  return true;
}

function toLoanInput(input: LoanRepaymentInput) {
  return {
    principal: input.loanAmount,
    annualRatePercent: input.annualRatePercent,
    termMonths: input.termYears * 12,
    extraMonthlyPayment: input.extraMonthlyPayment ?? 0,
  };
}

export function calculateLoanRepayment(
  input: LoanRepaymentInput,
): LoanRepaymentResult | null {
  if (!isValidLoanRepaymentInput(input)) {
    return null;
  }

  const loanInput = toLoanInput(input);
  const result = calculatePeriodicPayment(loanInput);
  if (!result) return null;

  return {
    monthlyPayment: result.monthlyPayment,
    totalInterest: result.totalInterest,
    totalPaid: result.totalPayment,
    payoffMonths: result.actualTermMonths,
    principal: result.principal,
  };
}

export function generateLoanRepaymentSchedule(
  input: LoanRepaymentInput,
  maxRows = 12,
): AmortizationRow[] {
  if (!isValidLoanRepaymentInput(input)) {
    return [];
  }
  return generateLoanSchedule(toLoanInput(input)).slice(0, maxRows);
}

export function generateFullLoanRepaymentSchedule(
  input: LoanRepaymentInput,
): AmortizationRow[] {
  if (!isValidLoanRepaymentInput(input)) {
    return [];
  }
  return generateLoanSchedule(toLoanInput(input));
}
