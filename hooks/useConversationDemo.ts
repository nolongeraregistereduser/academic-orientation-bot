"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { orientationRoutes } from "@/config/routing";
import {
  ADVISOR_WELCOME_MESSAGE,
  createInitialConversationState,
  getConversationProgress,
  getNextConversationQuestion,
  getPhaseMeta,
  PROCESSING_STAGES,
  submitConversationAnswer,
} from "@/lib/conversation-engine";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";
import { buildDemoRecommendation } from "@/lib/demo-recommendation";
import type {
  ConversationAnswerPayload,
  ConversationEngineState,
  ConversationMessage,
  ConversationPhaseId,
  ConversationPhaseMeta,
  ConversationProgress,
  ConversationQuestion,
  ProcessingStage,
} from "@/types/orientation-chat";
import { useOrientationSession } from "@/hooks/useOrientationSession";

interface UseConversationDemoResult {
  messages: ConversationMessage[];
  currentQuestion: ConversationQuestion | null;
  progress: ConversationProgress;
  currentPhaseMeta: ConversationPhaseMeta | null;
  isStarted: boolean;
  isAdvisorTyping: boolean;
  isSubmitting: boolean;
  isProcessing: boolean;
  processingStages: ProcessingStage[];
  processingIndex: number;
  flowError: string | null;
  canSend: boolean;
  startConversation: () => void;
  submitAnswer: (payload: ConversationAnswerPayload) => Promise<void>;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function createMessage(
  role: ConversationMessage["role"],
  content: string,
  status: ConversationMessage["status"],
  phaseId?: ConversationMessage["phaseId"],
  questionId?: ConversationMessage["questionId"],
): ConversationMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    content,
    status,
    questionId,
    phaseId,
    createdAtIso: new Date().toISOString(),
  };
}

export function useConversationDemo(): UseConversationDemoResult {
  const router = useRouter();
  const {
    draft,
    updateAnswers,
    updateProfile,
    setResultSnapshot,
    setDemoResultSnapshot,
  } = useOrientationSession();

  const latestDraftRef = useRef(draft);
  const phaseRef = useRef<ConversationPhaseId | null>(null);
  const engineStateRef = useRef<ConversationEngineState>(createInitialConversationState());
  const answerAccumulatorRef = useRef<Partial<typeof draft.answers>>({
    countryFlexibility: "usa-only",
    visaPreference: "f1-focused",
  });
  const profileAccumulatorRef = useRef<Partial<typeof draft.profile>>({
    preferredDestinations: ["United States"],
  });

  const [messages, setMessages] = useState<ConversationMessage[]>([
    createMessage("assistant", ADVISOR_WELCOME_MESSAGE, "complete"),
  ]);
  const [currentQuestion, setCurrentQuestion] = useState<ConversationQuestion | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isAdvisorTyping, setIsAdvisorTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const [flowError, setFlowError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ConversationProgress>(
    getConversationProgress(engineStateRef.current),
  );
  const [currentPhaseMeta, setCurrentPhaseMeta] = useState<ConversationPhaseMeta | null>(null);

  useEffect(() => {
    latestDraftRef.current = draft;
  }, [draft]);

  const markMessageComplete = useCallback((messageId: string) => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === messageId ? { ...message, status: "complete" } : message,
      ),
    );
  }, []);

  const askAdvisorMessage = useCallback(
    async (content: string, phaseId?: ConversationPhaseId) => {
      setIsAdvisorTyping(true);
      await wait(520 + Math.floor(Math.random() * 260));

      const assistantMessage = createMessage("assistant", content, "streaming", phaseId);

      setMessages((previous) => [...previous, assistantMessage]);
      setIsAdvisorTyping(false);

      window.setTimeout(() => {
        markMessageComplete(assistantMessage.id);
      }, 900);
    },
    [markMessageComplete],
  );

  const askAdvisorQuestion = useCallback(
    async (question: ConversationQuestion) => {
      await askAdvisorMessage(question.prompt, question.phaseId);
      setCurrentQuestion(question);

      if (phaseRef.current !== question.phaseId) {
        phaseRef.current = question.phaseId;
        setCurrentPhaseMeta(getPhaseMeta(question.phaseId));
        trackFunnelEvent("assessment_phase_started", {
          phaseId: question.phaseId,
        });
      }

      trackFunnelEvent("question_asked", {
        questionId: question.id,
        phaseId: question.phaseId,
      });
    },
    [askAdvisorMessage],
  );

  const runProcessingAndBuildResults = useCallback(async () => {
    setIsProcessing(true);
    setProcessingIndex(0);

    for (let index = 0; index < PROCESSING_STAGES.length; index += 1) {
      setProcessingIndex(index);
      await wait(620 + index * 110);
    }

    const mergedInput = {
      profile: {
        ...latestDraftRef.current.profile,
        ...profileAccumulatorRef.current,
      },
      answers: {
        ...latestDraftRef.current.answers,
        ...answerAccumulatorRef.current,
        countryFlexibility: "usa-only" as const,
        visaPreference: "f1-focused" as const,
      },
    };

    const demoSnapshot = await buildDemoRecommendation(mergedInput);
    setResultSnapshot(demoSnapshot.rawSnapshot);
    setDemoResultSnapshot(demoSnapshot);

    trackFunnelEvent("chat_completed", {
      branch: engineStateRef.current.branchTag ?? "balanced",
      topMajor: demoSnapshot.topMajors[0]?.majorName ?? "unknown",
      askedQuestions: engineStateRef.current.askedQuestionIds.length,
    });

    router.push(orientationRoutes.demoResults);
  }, [router, setDemoResultSnapshot, setResultSnapshot]);

  const startConversation = useCallback(() => {
    if (isStarted) {
      return;
    }

    const freshState = createInitialConversationState();
    engineStateRef.current = freshState;
    phaseRef.current = null;

    answerAccumulatorRef.current = {
      countryFlexibility: "usa-only",
      visaPreference: "f1-focused",
    };
    profileAccumulatorRef.current = {
      preferredDestinations: ["United States"],
    };

    setResultSnapshot(null);
    setDemoResultSnapshot(null);
    setFlowError(null);
    setProgress(getConversationProgress(freshState));
    setCurrentPhaseMeta(null);
    setIsStarted(true);

    trackFunnelEvent("chat_started", {
      source: "orientation_demo",
    });

    const initialQuestion = getNextConversationQuestion(engineStateRef.current);
    if (!initialQuestion) {
      return;
    }

    const phaseIntro = `Great. We'll start with ${getPhaseMeta(initialQuestion.phaseId).title.toLowerCase()}.`;

    void (async () => {
      await askAdvisorMessage(phaseIntro, initialQuestion.phaseId);
      await askAdvisorQuestion(initialQuestion);
    })();
  }, [askAdvisorMessage, askAdvisorQuestion, isStarted, setDemoResultSnapshot, setResultSnapshot]);

  const submitAnswer = useCallback(
    async (payload: ConversationAnswerPayload) => {
      if (!currentQuestion || isSubmitting || isAdvisorTyping || isProcessing) {
        return;
      }

      if (payload.selectedOptionIds.length < currentQuestion.minSelections) {
        return;
      }

      setIsSubmitting(true);

      try {
        const turn = submitConversationAnswer(
          engineStateRef.current,
          currentQuestion.id,
          payload,
        );

        const studentMessage = createMessage(
          "student",
          turn.studentSummary,
          "complete",
          currentQuestion.phaseId,
        );
        setMessages((previous) => [...previous, studentMessage]);

        trackFunnelEvent("answer_submitted", {
          questionId: currentQuestion.id,
          phaseId: currentQuestion.phaseId,
        });

        const previousBranch = engineStateRef.current.branchTag;
        engineStateRef.current = turn.nextState;
        setProgress(getConversationProgress(turn.nextState));
         setCurrentQuestion(null);

        answerAccumulatorRef.current = {
          ...answerAccumulatorRef.current,
          ...turn.answerPatch,
        };

        profileAccumulatorRef.current = {
          ...profileAccumulatorRef.current,
          ...turn.profilePatch,
        };

        updateAnswers(turn.answerPatch);
        updateProfile(turn.profilePatch);

        if (
          turn.nextState.branchTag &&
          previousBranch !== turn.nextState.branchTag &&
          turn.nextState.branchTag !== "balanced"
        ) {
          trackFunnelEvent("branch_selected", {
            branch: turn.nextState.branchTag,
          });
        }

        if (turn.phaseMilestone) {
          await askAdvisorMessage(
            turn.phaseMilestone,
            turn.nextQuestion?.phaseId ?? undefined,
          );
        }

        if (turn.isComplete || !turn.nextQuestion) {
          await runProcessingAndBuildResults();
          return;
        }

        await askAdvisorQuestion(turn.nextQuestion);
      } catch (error) {
        setIsProcessing(false);
        setProcessingIndex(-1);
        setFlowError(
          error instanceof Error
            ? error.message
            : "Unable to complete the conversational recommendation flow.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      askAdvisorMessage,
      askAdvisorQuestion,
      currentQuestion,
      isAdvisorTyping,
      isProcessing,
      isSubmitting,
      runProcessingAndBuildResults,
      updateAnswers,
      updateProfile,
    ],
  );

  return {
    messages,
    currentQuestion,
    progress,
    currentPhaseMeta,
    isStarted,
    isAdvisorTyping,
    isSubmitting,
    isProcessing,
    processingStages: PROCESSING_STAGES,
    processingIndex,
    flowError,
    canSend:
      isStarted && !isAdvisorTyping && !isSubmitting && !isProcessing && currentQuestion !== null,
    startConversation,
    submitAnswer,
  };
}
