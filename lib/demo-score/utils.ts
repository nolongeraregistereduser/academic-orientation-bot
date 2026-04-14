export function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeTokens(values: string[]): string[] {
  return values.map(normalizeToken).filter(Boolean);
}

export function fuzzyIncludes(source: string, token: string): boolean {
  const normalizedSource = normalizeToken(source);
  const normalizedToken = normalizeToken(token);
  return normalizedSource.includes(normalizedToken) || normalizedToken.includes(normalizedSource);
}

export function countMatches(inputs: string[], signals: string[]): number {
  const normalizedInputs = normalizeTokens(inputs);
  const normalizedSignals = normalizeTokens(signals);
  return normalizedSignals.reduce((count, signal) => {
    const hasMatch = normalizedInputs.some((input) => fuzzyIncludes(input, signal));
    return hasMatch ? count + 1 : count;
  }, 0);
}

export function ratio(numerator: number, denominator: number): number {
  if (denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function toPercent(value: number, max: number): number {
  return clamp((value / max) * 100, 0, 100);
}

export function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
