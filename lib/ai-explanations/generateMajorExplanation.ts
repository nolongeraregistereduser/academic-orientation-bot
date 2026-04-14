import { explanationTemplates } from "@/lib/ai-explanations/explanationTemplates";
import { generateCounselorTone } from "@/lib/ai-explanations/generateCounselorTone";
import { currency } from "@/lib/demo-score/utils";
import type {
  ExplainabilitySignal,
  MajorScore,
  OrientationScoringInput,
} from "@/types/scoring";
import type { UniversityProgramMatch } from "@/types/university";

export interface MajorExplanationOutput {
  advisorNarrative: string;
  tuitionFeasibilityInsight: string;
}

export function generateMajorExplanation(
  input: OrientationScoringInput,
  majorScore: MajorScore,
  signal: ExplainabilitySignal,
  matchedPrograms: UniversityProgramMatch[],
): MajorExplanationOutput {
  const opening =
    explanationTemplates.opening[
      majorScore.totalScore >= 80 ? 0 : 1
    ];

  const confidenceLine =
    explanationTemplates.confidence[
      majorScore.confidence >= 85 ? 0 : 1
    ];

  const strongest = signal.strongestSignals.slice(0, 2).join(" ");
  const caution = signal.cautionSignals[0] ?? "Budget and admissions constraints should be monitored.";

  const narrative = generateCounselorTone([
    `${majorScore.majorName} is a ${majorScore.totalScore}/100 fit for your profile.`,
    opening,
    strongest,
    confidenceLine,
    caution,
    explanationTemplates.closing[0],
  ]);

  const averageYearlyCost =
    matchedPrograms.length > 0
      ? matchedPrograms.reduce((total, program) => total + program.yearlyTotalCostUsd, 0) /
        matchedPrograms.length
      : input.answers.maxAnnualTuitionBudgetUsd;

  const budgetDelta = input.answers.maxAnnualTuitionBudgetUsd - averageYearlyCost;

  const tuitionFeasibilityInsight =
    budgetDelta >= 4000
      ? `Strong affordability zone. Your tuition budget of ${currency(input.answers.maxAnnualTuitionBudgetUsd)} is comfortably above average projected yearly cost ${currency(averageYearlyCost)}.`
      : budgetDelta >= 0
        ? `Borderline but feasible. Your tuition budget of ${currency(input.answers.maxAnnualTuitionBudgetUsd)} is close to projected yearly cost ${currency(averageYearlyCost)}.`
        : `Financial stretch. Your tuition budget of ${currency(input.answers.maxAnnualTuitionBudgetUsd)} is below projected yearly cost ${currency(averageYearlyCost)}. Scholarship-first targeting is recommended.`;

  return {
    advisorNarrative: narrative,
    tuitionFeasibilityInsight,
  };
}
