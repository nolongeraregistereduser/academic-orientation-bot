import type { OrientationScoringInput } from "@/types/scoring";
import type { UniversityProgramMatch, UniversityProgram } from "@/types/university";

export interface EligibilityRuleResult {
  eligibility: UniversityProgramMatch["eligibility"];
  eligibilityScore: number;
}

export function applyEligibilityRules(
  input: OrientationScoringInput,
  program: UniversityProgram,
): EligibilityRuleResult {
  const englishGap = input.answers.englishScore - program.minimumEnglishScore;

  if (englishGap >= 0) {
    return {
      eligibility: "eligible",
      eligibilityScore: 10,
    };
  }

  if (englishGap >= -8) {
    return {
      eligibility: "at-risk",
      eligibilityScore: 6,
    };
  }

  return {
    eligibility: "at-risk",
    eligibilityScore: 2,
  };
}
