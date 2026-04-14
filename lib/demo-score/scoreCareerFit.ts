import type { MajorTaxonomyNode } from "@/data/mock-major-taxonomy";
import { salaryAndCareerOutcomes } from "@/data/salary-and-career-outcomes";
import type { OrientationScoringInput } from "@/types/scoring";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import type { DimensionScoreResult } from "@/lib/demo-score/types";
import { clamp, countMatches, ratio } from "@/lib/demo-score/utils";

export function scoreCareerFit(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): DimensionScoreResult {
  const careerVisionMatchCount = countMatches(
    [input.answers.fiveYearCareerVision],
    major.careerSignals,
  );
  const careerVisionScore = ratio(careerVisionMatchCount, Math.max(major.careerSignals.length, 1)) * 10;

  const outcome = salaryAndCareerOutcomes[major.id];
  const normalizedSalaryFactor = outcome
    ? clamp((outcome.medianSalaryUsd - 70000) / 60000, 0, 1)
    : 0.5;

  const salaryPriorityScore =
    input.answers.salaryVsPassion === "salary-first"
      ? normalizedSalaryFactor * 4
      : input.answers.salaryVsPassion === "passion-first"
        ? 2.5
        : 3;

  const careerTrackScore =
    input.answers.corporateVsEntrepreneurship === "corporate"
      ? major.category.includes("business")
        ? 3
        : 2.2
      : input.answers.corporateVsEntrepreneurship === "entrepreneurship"
        ? major.category.includes("business") || major.category.includes("tech")
          ? 3
          : 2
        : 2.6;

  const roleStyleScore =
    input.answers.leadershipVsSpecialist === "technical-specialist"
      ? (major.personalitySignals.analytical / 5) * 3
      : input.answers.leadershipVsSpecialist === "leadership"
        ? 2.4
        : 2.7;

  const rawScore =
    careerVisionScore + salaryPriorityScore + careerTrackScore + roleStyleScore;
  const score = Math.round(clamp(rawScore, 0, SCORE_WEIGHTS.careerFit));

  return {
    score,
    rationale: [
      careerVisionMatchCount > 0
        ? `Your five-year vision aligns with ${major.name} career outcomes.`
        : `Career vision alignment is moderate for ${major.name}.`,
      outcome
        ? `${major.name} has a median salary outlook around ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(outcome.medianSalaryUsd)}.`
        : "Career salary outlook is estimated from category benchmarks.",
    ],
  };
}
