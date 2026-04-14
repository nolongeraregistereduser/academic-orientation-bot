import type { OrientationAnswers, StudentProfileContext } from "@/types/orientation";
import type { OrientationResultSnapshot } from "@/types/scoring";

export type ConversationRole = "assistant" | "student";

export type ConversationMessageStatus = "complete" | "streaming";

export type ConversationQuestionId =
  | "gpa-range"
  | "strongest-subjects"
  | "weakest-subjects"
  | "advanced-courses"
  | "free-time-topics"
  | "preferred-problem-types"
  | "people-data-ideas"
  | "extracurriculars"
  | "structure-vs-open"
  | "solo-team-leadership"
  | "detail-vs-big-picture"
  | "work-setting"
  | "desired-career"
  | "salary-impact-prestige"
  | "org-path"
  | "balance-vs-growth"
  | "us-states"
  | "tuition-budget"
  | "scholarship-need"
  | "degree-duration"
  | "self-strengths"
  | "help-request-theme"
  | "core-values"
  | "regret-minimization";

export type ConversationPhaseId =
  | "academic-foundation"
  | "interests"
  | "work-style"
  | "career-goals"
  | "constraints"
  | "self-awareness";

export type ConversationQuestionMode =
  | "pill-chips"
  | "cards"
  | "segmented"
  | "range-cards"
  | "reflection";

export type ConversationBranchTag =
  | "quant"
  | "creative"
  | "impact"
  | "business"
  | "balanced"
  | null;

export interface ConversationMessage {
  id: string;
  role: ConversationRole;
  content: string;
  createdAtIso: string;
  status: ConversationMessageStatus;
  phaseId?: ConversationPhaseId;
  questionId?: ConversationQuestionId;
}

export interface ConversationOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  value: string;
}

export interface ConversationQuestion {
  id: ConversationQuestionId;
  phaseId: ConversationPhaseId;
  prompt: string;
  helper: string;
  mode: ConversationQuestionMode;
  options: ConversationOption[];
  multiSelect: boolean;
  minSelections: number;
  maxSelections: number;
  required: boolean;
  allowReflection?: boolean;
  reflectionPlaceholder?: string;
}

export interface ConversationSlots {
  gpaRange: OrientationAnswers["gpaRange"];
  strongestSubjects: string[];
  weakestSubjects: string[];
  decisionPriority: OrientationAnswers["decisionPriority"];
  scholarshipNeed: OrientationAnswers["scholarshipNeed"];
  preferredUsStates: string[];
  desiredCareerTrack: string;
  coreValues: string[];
}

export interface ConversationEngineState {
  branchTag: ConversationBranchTag;
  targetQuestionCount: number;
  currentPhaseId: ConversationPhaseId | null;
  askedQuestionIds: ConversationQuestionId[];
  skippedQuestionIds: ConversationQuestionId[];
  answersByQuestion: Partial<Record<ConversationQuestionId, string[]>>;
  reflectionByQuestion: Partial<Record<ConversationQuestionId, string>>;
  slots: ConversationSlots;
}

export interface ConversationAnswerPayload {
  selectedOptionIds: string[];
  reflectionText?: string;
}

export interface ConversationProgress {
  askedCount: number;
  targetCount: number;
  percent: number;
  currentPhaseId: ConversationPhaseId | null;
  currentPhaseIndex: number;
  totalPhases: number;
}

export interface ConversationPhaseMeta {
  id: ConversationPhaseId;
  title: string;
  subtitle: string;
  milestoneCopy: string;
}

export interface ConversationTurnResult {
  nextState: ConversationEngineState;
  answerPatch: Partial<OrientationAnswers>;
  profilePatch: Partial<StudentProfileContext>;
  nextQuestion: ConversationQuestion | null;
  studentSummary: string;
  phaseMilestone: string | null;
  isComplete: boolean;
}

export interface ProcessingStage {
  id: string;
  label: string;
}

export interface DemoMajorResult {
  majorId: string;
  majorName: string;
  fitPercent: number;
  explanation: string;
  salaryOutlook: string;
  careerExamples: string[];
  confidence: number;
}

export interface DemoUniversityResult {
  programId: string;
  universityName: string;
  location: string;
  fitPercent: number;
  yearlyTuitionUsd: number;
  scholarshipPercent: number;
  whyItMatches: string;
}

export interface DemoRecommendationSnapshot {
  generatedAtIso: string;
  topMajors: DemoMajorResult[];
  counselorSummary: string;
  matchedUniversities: DemoUniversityResult[];
  ctaHref: string;
  rawSnapshot: OrientationResultSnapshot;
}