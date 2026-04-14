import type { OrientationScoringInput } from "@/types/scoring";

export function generateStudentSummary(input: OrientationScoringInput): string {
  return `${input.profile.firstName} is targeting ${input.profile.intendedProgramType} programs in the United States with a yearly tuition budget of ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(input.answers.maxAnnualTuitionBudgetUsd)}. The profile shows strongest signals in ${input.answers.strongestSubjects.join(", ")} and career intent around ${input.answers.fiveYearCareerVision}.`;
}
