import { mockMajorTaxonomy } from "@/data/mock-major-taxonomy";
import type { MajorScore, OrientationScoringInput } from "@/types/scoring";
import { scoreAcademicFit } from "@/lib/demo-score/scoreAcademicFit";
import { scoreInterestFit } from "@/lib/demo-score/scoreInterestFit";
import { scoreCareerFit } from "@/lib/demo-score/scoreCareerFit";
import { scoreFinancialFit } from "@/lib/demo-score/scoreFinancialFit";
import { scorePersonalityFit } from "@/lib/demo-score/scorePersonalityFit";
import { applyDeterministicRuleLayer } from "@/lib/demo-score/applyDeterministicRuleLayer";
import { SCORE_WEIGHTS } from "@/lib/demo-score/weights";
import { clamp } from "@/lib/demo-score/utils";

export function rankMajors(input: OrientationScoringInput): MajorScore[] {
  const ranked = mockMajorTaxonomy.map((major) => {
    const academic = scoreAcademicFit(input, major);
    const interest = scoreInterestFit(input, major);
    const career = scoreCareerFit(input, major);
    const financial = scoreFinancialFit(input, major);
    const personality = scorePersonalityFit(input, major);
    const rules = applyDeterministicRuleLayer(input, major.id);

    const academicScore = Math.round(
      clamp(
        academic.score + rules.academicFit,
        0,
        SCORE_WEIGHTS.academicFit,
      ),
    );
    const interestScore = Math.round(
      clamp(
        interest.score + rules.interestFit,
        0,
        SCORE_WEIGHTS.interestFit,
      ),
    );
    const careerScore = Math.round(
      clamp(
        career.score + rules.careerFit,
        0,
        SCORE_WEIGHTS.careerFit,
      ),
    );
    const personalityScore = Math.round(
      clamp(
        personality.score + rules.personalityFit,
        0,
        SCORE_WEIGHTS.personalityFit,
      ),
    );

    const totalScore =
      academicScore +
      interestScore +
      careerScore +
      financial.score +
      personalityScore;

    const confidence = Math.round(
      clamp(
        totalScore +
          (academicScore >= 26 ? 3 : 0) +
          (interestScore >= 18 ? 2 : 0) +
          (careerScore >= 15 ? 2 : 0) +
          rules.confidenceBonus,
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
        academicFit: academicScore,
        interestFit: interestScore,
        careerFit: careerScore,
        financialFeasibility: financial.score,
        personalityFit: personalityScore,
      },
      rationale: [
        rules.rationale[0] ?? "Deterministic rule-layer found no extra boost for this profile.",
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
