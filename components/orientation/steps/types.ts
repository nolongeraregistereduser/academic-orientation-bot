import type { OrientationAnswers } from "@/types/orientation";

export interface StepProps {
  answers: OrientationAnswers;
  updateAnswers: (partial: Partial<OrientationAnswers>) => void;
}

export function parseCommaValues(rawValue: string): string[] {
  return rawValue
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function stringifyCommaValues(values: string[]): string {
  return values.join(", ");
}
