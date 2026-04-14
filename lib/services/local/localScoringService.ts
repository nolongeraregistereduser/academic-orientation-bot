import { normalizeOrientationInput } from "@/lib/demo-score/normalizeInput";
import { rankMajors } from "@/lib/demo-score/rankMajors";
import type { MajorScore, OrientationScoringInput } from "@/types/scoring";
import type { ScoringService } from "@/types/services";

export const localScoringService: ScoringService = {
  async scoreMajors(input: OrientationScoringInput): Promise<MajorScore[]> {
    const normalizedInput = normalizeOrientationInput(input);
    return rankMajors(normalizedInput);
  },
};
