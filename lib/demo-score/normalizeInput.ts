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
      advancedCourseExposure: normalizeTokens(input.answers.advancedCourseExposure),
      curiosityTopics: normalizeTokens(input.answers.curiosityTopics),
      freeTimeTopics: normalizeTokens(input.answers.freeTimeTopics),
      favoriteProblemTypes: normalizeTokens(input.answers.favoriteProblemTypes),
      extracurricularProfiles: normalizeTokens(input.answers.extracurricularProfiles),
      preferredUsStates: normalizeTokens(input.answers.preferredUsStates),
      selfPerceivedStrengths: normalizeTokens(input.answers.selfPerceivedStrengths),
      helpRequestThemes: normalizeTokens(input.answers.helpRequestThemes),
      coreValues: normalizeTokens(input.answers.coreValues),
      desiredCareerTrack: input.answers.desiredCareerTrack.trim(),
      regretPromptReflection: input.answers.regretPromptReflection.trim(),
      fiveYearCareerVision: input.answers.fiveYearCareerVision.trim(),
      maxAnnualTuitionBudgetUsd: Math.max(0, input.answers.maxAnnualTuitionBudgetUsd),
      maxMonthlyLivingBudgetUsd: Math.max(0, input.answers.maxMonthlyLivingBudgetUsd),
      bankStatementCapacityUsd: Math.max(0, input.answers.bankStatementCapacityUsd),
      englishScore: clamp(input.answers.englishScore, 0, 120),
    },
  };
}
