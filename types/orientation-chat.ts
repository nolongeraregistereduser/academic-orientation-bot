import type { OrientationAnswers, StudentProfileContext } from "@/types/orientation";
import type { OrientationResultSnapshot } from "@/types/scoring";

export type ConversationRole = "assistant" | "student";

export type ConversationMessageStatus = "complete" | "streaming";

export type ConversationQuestionId =
  | "strongest-subjects"
  | "enjoyed-subjects"
  | "problem-solving-style"
  | "quant-follow-up"
  | "creative-follow-up"
  | "career-vision"
  | "salary-vs-passion"
  | "tuition-budget"
  | "scholarship-support"
  | "us-states";

export type ConversationBranch = "quant" | "creative" | "balanced";

export interface ConversationMessage {
  id: string;
  role: ConversationRole;
  content: string;
  createdAtIso: string;
  status: ConversationMessageStatus;
  questionId?: ConversationQuestionId;
}

export interface ConversationQuestion {
  id: ConversationQuestionId;
  prompt: string;
  helper: string;
  placeholder: string;
  suggestions?: string[];
}

export interface ConversationSlots {
  strongestSubjects: string[];
  enjoyedSubjects: string[];
  problemSolvingStyle: OrientationAnswers["thinkingStyle"];
  branchIntent: string;
  careerVision: string;
  salaryVsPassion: OrientationAnswers["salaryVsPassion"];
  tuitionBudgetUsd: number;
  scholarshipNeed: OrientationAnswers["scholarshipNeed"];
  preferredUsStates: string[];
}

export interface ConversationEngineState {
  branch: ConversationBranch | null;
  askedQuestionIds: ConversationQuestionId[];
  answersByQuestion: Partial<Record<ConversationQuestionId, string>>;
  slots: ConversationSlots;
}

export interface ConversationTurnResult {
  nextState: ConversationEngineState;
  answerPatch: Partial<OrientationAnswers>;
  profilePatch: Partial<StudentProfileContext>;
  nextQuestion: ConversationQuestion | null;
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