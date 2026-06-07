import { roundToCents } from "@/lib/finance/format";
import { annualToPeriodicRate } from "@/lib/finance/rates";

export interface LoanInput {
  principal: number;
  annualRatePercent: number;
  termMonths: number;
  extraMonthlyPayment?: number;
}

export interface LoanPaymentResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  actualTermMonths: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function isValidLoanInput(input: LoanInput): boolean {
  const { principal, annualRatePercent, termMonths } = input;
  const extra = input.extraMonthlyPayment ?? 0;

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRatePercent) ||
    !Number.isFinite(termMonths) ||
    !Number.isFinite(extra)
  ) {
    return false;
  }

  if (principal <= 0 || annualRatePercent < 0 || termMonths <= 0 || extra < 0) {
    return false;
  }

  return true;
}

export function calculatePeriodicPayment(
  input: LoanInput,
): LoanPaymentResult | null {
  if (!isValidLoanInput(input)) {
    return null;
  }

  const principal = roundToCents(input.principal);
  const extra = input.extraMonthlyPayment ?? 0;
  const monthlyRate = annualToPeriodicRate(input.annualRatePercent, 12);

  let monthlyPayment: number;

  if (input.annualRatePercent === 0) {
    monthlyPayment = roundToCents(principal / input.termMonths);
  } else {
    const n = input.termMonths;
    monthlyPayment = roundToCents(
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1),
    );
  }

  const schedule = buildSchedule(
    principal,
    input.annualRatePercent,
    monthlyRate,
    monthlyPayment,
    input.termMonths,
    extra,
  );

  const lastRow = schedule[schedule.length - 1];
  const totalPayment = roundToCents(
    schedule.reduce((sum, row) => sum + row.payment, 0),
  );
  const totalInterest = roundToCents(totalPayment - principal);

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    principal,
    actualTermMonths: lastRow?.month ?? input.termMonths,
  };
}

function buildSchedule(
  principal: number,
  annualRatePercent: number,
  monthlyRate: number,
  monthlyPayment: number,
  maxMonths: number,
  extraMonthlyPayment: number,
): AmortizationRow[] {
  let balance = principal;
  const rows: AmortizationRow[] = [];
  let month = 0;

  while (balance > 0.005 && month < maxMonths + 600) {
    month += 1;
    const interest = roundToCents(
      annualRatePercent === 0 ? 0 : balance * monthlyRate,
    );

    const isEffectivelyLast =
      month >= maxMonths && extraMonthlyPayment === 0
        ? true
        : balance + interest <= monthlyPayment + extraMonthlyPayment + 0.005;

    let payment: number;
    let principalPaid: number;

    if (isEffectivelyLast || balance <= monthlyPayment - interest + extraMonthlyPayment + 0.005) {
      principalPaid = roundToCents(balance);
      payment = roundToCents(principalPaid + interest);
      balance = 0;
    } else {
      payment = roundToCents(monthlyPayment + extraMonthlyPayment);
      principalPaid = roundToCents(payment - interest);
      balance = roundToCents(Math.max(0, balance - principalPaid));
    }

    rows.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });

    if (balance === 0) break;
  }

  return rows;
}

export function generateLoanSchedule(input: LoanInput): AmortizationRow[] {
  const result = calculatePeriodicPayment(input);
  if (!result) return [];

  const monthlyRate = annualToPeriodicRate(input.annualRatePercent, 12);
  const extra = input.extraMonthlyPayment ?? 0;

  return buildSchedule(
    result.principal,
    input.annualRatePercent,
    monthlyRate,
    result.monthlyPayment,
    input.termMonths,
    extra,
  );
}
