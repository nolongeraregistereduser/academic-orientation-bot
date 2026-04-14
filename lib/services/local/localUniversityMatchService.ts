import { matchUniversities } from "@/lib/university-matching/matchUniversities";
import type { MajorScore, OrientationScoringInput } from "@/types/scoring";
import type { UniversityMatchingService } from "@/types/services";
import type { UniversityProgramMatch } from "@/types/university";

export const localUniversityMatchService: UniversityMatchingService = {
  async matchPrograms(
    input: OrientationScoringInput,
    majorScores: MajorScore[],
  ): Promise<UniversityProgramMatch[]> {
    return matchUniversities(input, majorScores);
  },
};
