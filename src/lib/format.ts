export function formatBillions(value: number): string {
  if (Math.abs(value) >= 1) {
    return `$${value.toFixed(0)}B`;
  }
  return `$${(value * 1000).toFixed(0)}M`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDollars(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatCents(value: number): string {
  return `${value.toFixed(0)}¢`;
}
