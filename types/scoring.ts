import type { OrientationSessionInput } from "@/types/orientation";
import type { UniversityProgramMatch } from "@/types/university";

export interface ScoreDimensionBreakdown {
  academicFit: number;
  interestFit: number;
  careerFit: number;
  financialFeasibility: number;
  personalityFit: number;
}

export interface MajorScore {
  majorId: string;
  majorName: string;
  totalScore: number;
  confidence: number;
  breakdown: ScoreDimensionBreakdown;
  rationale: string[];
}

export interface ExplainabilitySignal {
  majorId: string;
  strongestSignals: string[];
  cautionSignals: string[];
  recommendedActions: string[];
}

export interface MajorRecommendation extends MajorScore {
  explainability: ExplainabilitySignal;
  advisorNarrative: string;
  careerOutlook: string;
  tuitionFeasibilityInsight: string;
  matchedPrograms: UniversityProgramMatch[];
}

export interface OrientationResultSnapshot {
  generatedAtIso: string;
  studentDisplayName: string;
  profileSummary: string;
  topMajors: MajorRecommendation[];
  allRankedMajors: MajorScore[];
  topUniversityMatches: UniversityProgramMatch[];
  confidenceAverage: number;
  executiveSummary: string;
}

export type OrientationScoringInput = OrientationSessionInput;
