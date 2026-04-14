import type { OrientationScoringInput } from "@/types/scoring";
import { clamp, normalizeTokens } from "@/lib/demo-score/utils";

export function normalizeOrientationInput(
  input: OrientationScoringInput,
): OrientationScoringInput {
  return {
    profile: {
      ...input.profile,
      intendedMajors: normalizeTokens(input.profile.intendedMajors),
      preferredDestinations: normalizeTokens(input.profile.preferredDestinations),
    },
    answers: {
      ...input.answers,
      strongestSubjects: normalizeTokens(input.answers.strongestSubjects),
      dislikedSubjects: normalizeTokens(input.answers.dislikedSubjects),
      curiosityTopics: normalizeTokens(input.answers.curiosityTopics),
      favoriteProblemTypes: normalizeTokens(input.answers.favoriteProblemTypes),
      fiveYearCareerVision: input.answers.fiveYearCareerVision.trim(),
      maxAnnualTuitionBudgetUsd: Math.max(0, input.answers.maxAnnualTuitionBudgetUsd),
      maxMonthlyLivingBudgetUsd: Math.max(0, input.answers.maxMonthlyLivingBudgetUsd),
      bankStatementCapacityUsd: Math.max(0, input.answers.bankStatementCapacityUsd),
      englishScore: clamp(input.answers.englishScore, 0, 120),
    },
  };
}
