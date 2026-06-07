import {
  calculatePeriodicPayment,
  generateLoanSchedule,
  type AmortizationRow,
  type LoanInput,
} from "@/lib/finance/amortization";
export { formatUSD, roundToCents } from "@/lib/finance/format";
export type { AmortizationRow };

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  annualRate: number;
  termYears: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
}

function toLoanInput(input: MortgageInput): LoanInput | null {
  if (!isValidMortgageInput(input)) {
    return null;
  }

  return {
    principal: input.homePrice - input.downPayment,
    annualRatePercent: input.annualRate,
    termMonths: input.termYears * 12,
    extraMonthlyPayment: 0,
  };
}

export function isValidMortgageInput(input: MortgageInput): boolean {
  const { homePrice, downPayment, annualRate, termYears } = input;

  if (
    !Number.isFinite(homePrice) ||
    !Number.isFinite(downPayment) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(termYears)
  ) {
    return false;
  }

  if (homePrice <= 0 || downPayment < 0 || downPayment > homePrice) {
    return false;
  }

  if (annualRate < 0 || termYears <= 0) {
    return false;
  }

  const principal = homePrice - downPayment;
  return principal > 0;
}

export function calculateMortgage(input: MortgageInput): MortgageResult | null {
  const loanInput = toLoanInput(input);
  if (!loanInput) return null;

  const result = calculatePeriodicPayment(loanInput);
  if (!result) return null;

  return {
    monthlyPayment: result.monthlyPayment,
    totalPayment: result.totalPayment,
    totalInterest: result.totalInterest,
    principal: result.principal,
  };
}

export function generateFullAmortizationSchedule(
  input: MortgageInput,
): AmortizationRow[] {
  const loanInput = toLoanInput(input);
  if (!loanInput) return [];
  return generateLoanSchedule(loanInput);
}

export function generateAmortizationSchedule(
  input: MortgageInput,
  maxRows = 12,
): AmortizationRow[] {
  return generateFullAmortizationSchedule(input).slice(0, maxRows);
}
