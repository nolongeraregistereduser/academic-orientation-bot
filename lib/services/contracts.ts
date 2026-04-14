import type {
  ExplanationService,
  OrientationPipelineService,
  ScoringService,
  UniversityMatchingService,
} from "@/types/services";

export interface OrientationServices {
  scoringService: ScoringService;
  explanationService: ExplanationService;
  universityMatchingService: UniversityMatchingService;
  orientationPipelineService: OrientationPipelineService;
}
