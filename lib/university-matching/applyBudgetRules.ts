import type { OrientationScoringInput } from "@/types/scoring";
import type { University, UniversityProgram, UniversityProgramMatch } from "@/types/university";

export interface BudgetRuleResult {
  budgetFit: UniversityProgramMatch["budgetFit"];
  yearlyTotalCostUsd: number;
  budgetScore: number;
}

export function applyBudgetRules(
  input: OrientationScoringInput,
  university: University,
  program: UniversityProgram,
): BudgetRuleResult {
  const yearlyTotalCostUsd =
    program.annualTuitionUsd + university.averageMonthlyLivingCostUsd * 12;

  const yearlyBudgetCapacity =
    input.answers.maxAnnualTuitionBudgetUsd +
    input.answers.maxMonthlyLivingBudgetUsd * 12;

  if (yearlyTotalCostUsd <= yearlyBudgetCapacity) {
    return {
      budgetFit: "within-budget",
      yearlyTotalCostUsd,
      budgetScore: 12,
    };
  }

  if (yearlyTotalCostUsd <= yearlyBudgetCapacity * 1.12) {
    return {
      budgetFit: "stretch",
      yearlyTotalCostUsd,
      budgetScore: 8,
    };
  }

  return {
    budgetFit: "over-budget",
    yearlyTotalCostUsd,
    budgetScore: 3,
  };
}
