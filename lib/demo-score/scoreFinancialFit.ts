import type { MajorTaxonomyNode } from "@/data/mock-major-taxonomy";
import type { OrientationScoringInput } from "@/types/scoring";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import type { DimensionScoreResult } from "@/lib/demo-score/types";
import { clamp, currency } from "@/lib/demo-score/utils";

export function scoreFinancialFit(
  input: OrientationScoringInput,
  major: MajorTaxonomyNode,
): DimensionScoreResult {
  const budget = input.answers.maxAnnualTuitionBudgetUsd;
  const [bandLow, bandHigh] = major.annualTuitionBandUsd;

  const tuitionScore =
    budget >= bandHigh
      ? 6
      : budget >= bandLow
        ? 5
        : budget >= bandLow * 0.85
          ? 3.5
          : 2;

  const livingBudgetScore =
    input.answers.maxMonthlyLivingBudgetUsd >= 1800
      ? 2
      : input.answers.maxMonthlyLivingBudgetUsd >= 1400
        ? 1.5
        : 1;

  const scholarshipScore =
    input.answers.scholarshipNeed === "high"
      ? major.annualTuitionBandUsd[1] > 40000
        ? 1.2
        : 1.8
      : input.answers.scholarshipNeed === "moderate"
        ? 1.6
        : 1;

  const bankScore =
    input.answers.bankStatementCapacityUsd >= budget * 1.2
      ? 1.2
      : input.answers.bankStatementCapacityUsd >= budget
        ? 0.9
        : 0.5;

  const rawScore = tuitionScore + livingBudgetScore + scholarshipScore + bankScore;
  const score = Math.round(clamp(rawScore, 0, SCORE_WEIGHTS.financialFeasibility));

  const rationale = [
    `Your tuition budget ${currency(budget)} sits against ${major.name} bands of ${currency(bandLow)} to ${currency(bandHigh)}.`,
    input.answers.scholarshipNeed === "high"
      ? "Scholarship strategy is important for this pathway."
      : "Funding profile is generally workable for this pathway.",
  ];

  return {
    score,
    rationale,
  };
}
