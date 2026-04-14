import type { ExplainabilitySignal, MajorScore } from "@/types/scoring";

const dimensionCopy: Record<keyof MajorScore["breakdown"], string> = {
  academicFit: "academic readiness",
  interestFit: "interest alignment",
  careerFit: "career direction",
  financialFeasibility: "financial feasibility",
  personalityFit: "work-style match",
};

export function buildExplainabilitySignals(
  majorScores: MajorScore[],
): ExplainabilitySignal[] {
  return majorScores.map((majorScore) => {
    const orderedDimensions = Object.entries(majorScore.breakdown)
      .map(([dimension, score]) => ({
        dimension: dimension as keyof MajorScore["breakdown"],
        score,
      }))
      .sort((left, right) => right.score - left.score);

    const strongest = orderedDimensions.slice(0, 2).map((entry) => {
      return `Strong ${dimensionCopy[entry.dimension]} signal (${entry.score}).`;
    });

    const weakest = orderedDimensions.slice(-2).map((entry) => {
      return `Watch ${dimensionCopy[entry.dimension]} (${entry.score}) while planning.`;
    });

    return {
      majorId: majorScore.majorId,
      strongestSignals: strongest,
      cautionSignals: weakest,
      recommendedActions: [
        "Validate admission requirements against target universities.",
        "Prepare scholarship and funding documents early.",
        "Use University Explorer filters to shortlist realistic programs.",
      ],
    };
  });
}
