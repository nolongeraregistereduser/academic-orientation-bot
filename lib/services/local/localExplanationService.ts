import { buildExplainabilitySignals } from "@/lib/demo-score/buildExplainabilitySignals";
import type {
  ExplainabilitySignal,
  MajorScore,
  OrientationScoringInput,
} from "@/types/scoring";
import type { ExplanationService } from "@/types/services";

export const localExplanationService: ExplanationService = {
  async buildExplainabilitySignals(
    majorScores: MajorScore[],
  ): Promise<ExplainabilitySignal[]> {
    return buildExplainabilitySignals(majorScores);
  },

  async generateExecutiveSummary(
    input: OrientationScoringInput,
    topMajorName: string,
  ): Promise<string> {
    return `The profile indicates ${topMajorName} as the strongest major pathway based on academic fit, career alignment, and financial realism. This recommendation is anchored on the student's strengths in ${input.answers.strongestSubjects.join(", ")} and intended destination focus in the United States.`;
  },
};
