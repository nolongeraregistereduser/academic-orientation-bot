import type { MajorTaxonomyNode } from "@/data/mock-major-taxonomy";
import type { OrientationScoringInput } from "@/types/scoring";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import type { DimensionScoreResult } from "@/lib/demo-score/types";
import {
  clamp,
  countMatches,
  fuzzyIncludes,
  normalizeToken,
  ratio,
} from "@/lib/demo-score/utils";

export function scoreInterestFit(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): DimensionScoreResult {
  const intendedMajorDirectMatch = input.profile.intendedMajors.some((intendedMajor) =>
    fuzzyIncludes(intendedMajor, major.name),
  );

  const intendedMajorScore = intendedMajorDirectMatch ? 10 : 4;

  const domainMatchCount = countMatches(
    input.answers.preferredDomains.map(normalizeToken),
    major.domainSignals,
  );
  const domainScore = ratio(domainMatchCount, Math.max(major.domainSignals.length, 1)) * 8;

  const topicMatchCount =
    countMatches(input.answers.curiosityTopics, major.domainSignals) +
    countMatches(input.answers.favoriteProblemTypes, major.problemSignals);
  const topicScore = clamp(topicMatchCount, 0, 7);

  const practicalPreferenceScore =
    input.answers.practicalVsTheoryPreference === "practical"
      ? (major.personalitySignals.practical / 5) * 2
      : input.answers.practicalVsTheoryPreference === "theory"
        ? (major.personalitySignals.research / 5) * 2
        : 1.5;

  const rawScore = intendedMajorScore + domainScore + topicScore + practicalPreferenceScore;
  const score = Math.round(clamp(rawScore, 0, SCORE_WEIGHTS.interestFit));

  return {
    score,
    rationale: [
      intendedMajorDirectMatch
        ? `${major.name} matches your intended major direction.`
        : `${major.name} is an adjacent option to your current intent map.`,
      domainMatchCount > 0
        ? `Your preferred domains align with ${major.name} pathways.`
        : `Domain preference alignment is moderate for this major.`,
    ],
  };
}
