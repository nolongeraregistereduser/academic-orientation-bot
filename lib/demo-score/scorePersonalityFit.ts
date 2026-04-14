import type { MajorTaxonomyNode } from "@/data/mock-major-taxonomy";
import type { OrientationScoringInput } from "@/types/scoring";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import type { DimensionScoreResult } from "@/lib/demo-score/types";
import { clamp } from "@/lib/demo-score/utils";

function mapThinkingStyleScore(
  thinkingStyle: OrientationScoringInput["answers"]["thinkingStyle"],
  major: MajorTaxonomyNode,
): number {
  if (thinkingStyle === "analytical") {
    return (major.personalitySignals.analytical / 5) * 4;
  }
  if (thinkingStyle === "creative") {
    return (major.personalitySignals.creative / 5) * 4;
  }
  return 3;
}

function mapTeamworkScore(
  teamworkStyle: OrientationScoringInput["answers"]["teamworkStyle"],
  major: MajorTaxonomyNode,
): number {
  if (teamworkStyle === "team") {
    return (major.personalitySignals.teamwork / 5) * 3;
  }
  if (teamworkStyle === "solo") {
    return ((6 - major.personalitySignals.teamwork) / 5) * 3;
  }
  return 2.2;
}

function mapWorkStyleScore(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): number {
  const practicalScore =
    input.answers.practicalVsTheoryPreference === "practical"
      ? major.personalitySignals.practical / 5
      : input.answers.practicalVsTheoryPreference === "theory"
        ? major.personalitySignals.research / 5
        : 0.7;

  const researchFactor = input.answers.researchComfortLevel / 5;
  return (practicalScore + researchFactor) * 1.5;
}

export function scorePersonalityFit(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): DimensionScoreResult {
  const thinkingScore = mapThinkingStyleScore(input.answers.thinkingStyle, major);
  const teamworkScore = mapTeamworkScore(input.answers.teamworkStyle, major);
  const workStyleScore = mapWorkStyleScore(input, major);

  const rawScore = thinkingScore + teamworkScore + workStyleScore;
  const score = Math.round(clamp(rawScore, 0, SCORE_WEIGHTS.personalityFit));

  return {
    score,
    rationale: [
      `${major.name} aligns with your ${input.answers.thinkingStyle} working style.`,
      `Teamwork and execution preference fit score: ${score}/10.`,
    ],
  };
}
