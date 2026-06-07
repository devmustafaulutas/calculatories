/** Round to nearest cent (2 decimal places). */
export function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatUSD(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
