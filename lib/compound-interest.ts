import { roundToCents } from "@/lib/finance/format";

export type CompoundingFrequency = "monthly" | "quarterly" | "annually";

export interface CompoundInterestInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
  monthlyContribution?: number;
}

export interface YearlyBreakdownRow {
  year: number;
  balance: number;
  contributionsYtd: number;
  interestYtd: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalContributions: number;
  totalInterestEarned: number;
  yearlyBreakdown: YearlyBreakdownRow[];
}

const PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export function isValidCompoundInterestInput(
  input: CompoundInterestInput,
): boolean {
  const contribution = input.monthlyContribution ?? 0;

  if (
    !Number.isFinite(input.principal) ||
    !Number.isFinite(input.annualRatePercent) ||
    !Number.isFinite(input.years) ||
    !Number.isFinite(contribution)
  ) {
    return false;
  }

  if (input.principal <= 0 || input.annualRatePercent < 0 || input.years <= 0) {
    return false;
  }

  if (contribution < 0) {
    return false;
  }

  return true;
}

function contributionPerPeriod(
  monthlyContribution: number,
  frequency: CompoundingFrequency,
): number {
  const periodsPerYear = PERIODS_PER_YEAR[frequency];
  return (monthlyContribution * 12) / periodsPerYear;
}

export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult | null {
  if (!isValidCompoundInterestInput(input)) {
    return null;
  }

  const periodsPerYear = PERIODS_PER_YEAR[input.compoundingFrequency];
  const totalPeriods = Math.round(input.years * periodsPerYear);
  const periodicRate = input.annualRatePercent / 100 / periodsPerYear;
  const contributionPerPeriodAmount = contributionPerPeriod(
    input.monthlyContribution ?? 0,
    input.compoundingFrequency,
  );

  let balance = input.principal;
  let totalContributions = 0;
  const yearlyBreakdown: YearlyBreakdownRow[] = [];

  for (let year = 1; year <= input.years; year++) {
    let contributionsYtd = 0;
    let interestYtd = 0;
    const periodsThisYear =
      year === input.years
        ? totalPeriods - (year - 1) * periodsPerYear
        : periodsPerYear;

    for (let p = 0; p < periodsThisYear; p++) {
      const interest =
        input.annualRatePercent === 0 ? 0 : balance * periodicRate;
      balance += interest;
      balance += contributionPerPeriodAmount;
      interestYtd += interest;
      contributionsYtd += contributionPerPeriodAmount;
      totalContributions += contributionPerPeriodAmount;
    }

    yearlyBreakdown.push({
      year,
      balance: roundToCents(balance),
      contributionsYtd: roundToCents(contributionsYtd),
      interestYtd: roundToCents(interestYtd),
    });
  }

  const futureValue = roundToCents(balance);
  const totalInterestEarned = roundToCents(
    futureValue - input.principal - totalContributions,
  );

  return {
    futureValue,
    totalContributions: roundToCents(totalContributions),
    totalInterestEarned,
    yearlyBreakdown,
  };
}
