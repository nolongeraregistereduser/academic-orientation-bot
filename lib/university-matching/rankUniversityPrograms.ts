import type { UniversityProgramMatch } from "@/types/university";

export function rankUniversityPrograms(
  matches: UniversityProgramMatch[],
): UniversityProgramMatch[] {
  return [...matches].sort((left, right) => {
    if (right.fitScore !== left.fitScore) {
      return right.fitScore - left.fitScore;
    }

    return left.yearlyTotalCostUsd - right.yearlyTotalCostUsd;
  });
}
