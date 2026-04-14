import { mockUniversities } from "@/data/mock-universities";
import { mockUniversityPrograms } from "@/data/mock-university-programs";
import type { MajorScore, OrientationScoringInput } from "@/types/scoring";
import type { UniversityProgramMatch } from "@/types/university";
import { applyBudgetRules } from "@/lib/university-matching/applyBudgetRules";
import { applyEligibilityRules } from "@/lib/university-matching/applyEligibilityRules";
import { rankUniversityPrograms } from "@/lib/university-matching/rankUniversityPrograms";
import { clamp } from "@/lib/demo-score/utils";

function mapUniversityTierBonus(tier: UniversityProgramMatch["universityTier"]): number {
  if (tier === "elite") {
    return 6;
  }
  if (tier === "high") {
    return 4;
  }
  return 2;
}

export function matchUniversities(
  input: OrientationScoringInput,
  majorScores: MajorScore[],
): UniversityProgramMatch[] {
  const topMajors = majorScores.slice(0, 5);

  const matches: UniversityProgramMatch[] = [];

  topMajors.forEach((majorScore) => {
    const relevantPrograms = mockUniversityPrograms.filter((program) => {
      return (
        program.normalizedMajorId === majorScore.majorId &&
        program.degreeLevel === input.profile.intendedProgramType
      );
    });

    relevantPrograms.forEach((program) => {
      const university = mockUniversities.find(
        (candidate) => candidate.id === program.universityId,
      );

      if (!university) {
        return;
      }

      const budgetRule = applyBudgetRules(input, university, program);
      const eligibilityRule = applyEligibilityRules(input, program);

      const scholarshipBonus =
        input.answers.scholarshipNeed === "high" && program.scholarshipAvailable
          ? 4
          : input.answers.scholarshipNeed === "none"
            ? 1
            : 2;

      const stemBonus =
        program.stem && input.answers.fiveYearCareerVision.toLowerCase().includes("tech")
          ? 2
          : 0;

      const fitScore = Math.round(
        clamp(
          majorScore.totalScore * 0.72 +
            budgetRule.budgetScore +
            eligibilityRule.eligibilityScore +
            scholarshipBonus +
            stemBonus +
            mapUniversityTierBonus(university.brandTier),
          30,
          99,
        ),
      );

      matches.push({
        universityId: university.id,
        universityName: university.name,
        universityTier: university.brandTier,
        location: `${university.city}, ${university.state}`,
        programId: program.id,
        normalizedMajorId: program.normalizedMajorId,
        programName: program.programName,
        degreeLevel: program.degreeLevel,
        annualTuitionUsd: program.annualTuitionUsd,
        monthlyLivingCostUsd: university.averageMonthlyLivingCostUsd,
        yearlyTotalCostUsd: budgetRule.yearlyTotalCostUsd,
        fitScore,
        budgetFit: budgetRule.budgetFit,
        eligibility: eligibilityRule.eligibility,
        stem: program.stem,
        scholarshipAvailable: program.scholarshipAvailable,
      });
    });
  });

  return rankUniversityPrograms(matches).slice(0, 12);
}
