import { mockMajorTaxonomy } from "@/data/mock-major-taxonomy";
import type { MajorScore, OrientationScoringInput } from "@/types/scoring";
import { scoreAcademicFit } from "@/lib/demo-score/scoreAcademicFit";
import { scoreInterestFit } from "@/lib/demo-score/scoreInterestFit";
import { scoreCareerFit } from "@/lib/demo-score/scoreCareerFit";
import { scoreFinancialFit } from "@/lib/demo-score/scoreFinancialFit";
import { scorePersonalityFit } from "@/lib/demo-score/scorePersonalityFit";
import { clamp } from "@/lib/demo-score/utils";

export function rankMajors(input: OrientationScoringInput): MajorScore[] {
  const ranked = mockMajorTaxonomy.map((major) => {
    const academic = scoreAcademicFit(input, major);
    const interest = scoreInterestFit(input, major);
    const career = scoreCareerFit(input, major);
    const financial = scoreFinancialFit(input, major);
    const personality = scorePersonalityFit(input, major);

    const totalScore =
      academic.score +
      interest.score +
      career.score +
      financial.score +
      personality.score;

    const confidence = Math.round(
      clamp(
        totalScore +
          (academic.score >= 26 ? 3 : 0) +
          (interest.score >= 18 ? 2 : 0) +
          (career.score >= 15 ? 2 : 0),
        40,
        99,
      ),
    );

    return {
      majorId: major.id,
      majorName: major.name,
      totalScore,
      confidence,
      breakdown: {
        academicFit: academic.score,
        interestFit: interest.score,
        careerFit: career.score,
        financialFeasibility: financial.score,
        personalityFit: personality.score,
      },
      rationale: [
        academic.rationale[0],
        interest.rationale[0],
        career.rationale[0],
        financial.rationale[0],
        personality.rationale[0],
      ],
    } satisfies MajorScore;
  });

  return ranked.sort((left, right) => right.totalScore - left.totalScore);
}
