/** Convert annual percentage rate to periodic decimal rate. */
export function annualToPeriodicRate(
  annualRatePercent: number,
  periodsPerYear: number,
): number {
  return annualRatePercent / 100 / periodsPerYear;
}
