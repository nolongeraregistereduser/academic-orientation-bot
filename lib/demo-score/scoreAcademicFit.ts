import type { MajorTaxonomyNode } from "@/data/mock-major-taxonomy";
import type { OrientationScoringInput } from "@/types/scoring";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import type { DimensionScoreResult } from "@/lib/demo-score/types";
import {
  clamp,
  countMatches,
  normalizeToken,
  ratio,
} from "@/lib/demo-score/utils";

export function scoreAcademicFit(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): DimensionScoreResult {
  const strongestMatches = countMatches(
    input.answers.strongestSubjects,
    major.subjectSignals,
  );
  const strongestRatio = ratio(
    strongestMatches,
    Math.min(major.subjectSignals.length, 3),
  );
  const strongestScore = strongestRatio * 18;

  const dislikedMatches = countMatches(
    input.answers.dislikedSubjects,
    major.dislikedSignals,
  );
  const dislikedPenalty = dislikedMatches * 2;

  const quantitativeNeed = major.personalitySignals.analytical >= 4 ? 1 : 0.7;
  const quantitativeScore =
    (input.answers.enjoysQuantitativeProblemSolving / 5) * 6 * quantitativeNeed;

  const englishScore = clamp((input.answers.englishScore - 70) / 30, 0, 1) * 5;

  const normalizedCurrentMajor = normalizeToken(input.profile.currentMajor);
  const normalizedMajorName = normalizeToken(major.name);
  const continuityScore = normalizedCurrentMajor.includes(normalizedMajorName)
    ? 4
    : strongestMatches > 0
      ? 2.5
      : 1;

  const researchScore =
    (input.answers.researchComfortLevel / 5) *
    (major.personalitySignals.research >= 4 ? 2 : 1);

  const rawScore =
    strongestScore +
    quantitativeScore +
    englishScore +
    continuityScore +
    researchScore -
    dislikedPenalty;

  const score = Math.round(clamp(rawScore, 0, SCORE_WEIGHTS.academicFit));

  const rationale = [
    strongestMatches > 0
      ? `${major.name} aligns with ${strongestMatches} of your strongest subjects.`
      : `${major.name} has limited overlap with your strongest subjects.`,
    input.answers.englishScore >= 90
      ? "Your English score supports competitive admission requirements."
      : "Improving English score can unlock stronger program options.",
  ];

  return {
    score,
    rationale,
  };
}
