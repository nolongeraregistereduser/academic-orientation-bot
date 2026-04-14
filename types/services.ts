import type {
  ExplainabilitySignal,
  MajorScore,
  OrientationResultSnapshot,
  OrientationScoringInput,
} from "@/types/scoring";
import type { UniversityProgramMatch } from "@/types/university";

export interface ScoringService {
  scoreMajors(input: OrientationScoringInput): Promise<MajorScore[]>;
}

export interface ExplanationService {
  buildExplainabilitySignals(majorScores: MajorScore[]): Promise<ExplainabilitySignal[]>;
  generateExecutiveSummary(
    input: OrientationScoringInput,
    topMajorName: string,
  ): Promise<string>;
}

export interface UniversityMatchingService {
  matchPrograms(
    input: OrientationScoringInput,
    majorScores: MajorScore[],
  ): Promise<UniversityProgramMatch[]>;
}

export interface OrientationPipelineService {
  runOrientation(input: OrientationScoringInput): Promise<OrientationResultSnapshot>;
}
