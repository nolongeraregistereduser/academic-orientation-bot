"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { orientationRoutes } from "@/config/routing";
import {
  ADVISOR_WELCOME_MESSAGE,
  createInitialConversationState,
  getNextConversationQuestion,
  PROCESSING_STAGES,
  submitConversationAnswer,
} from "@/lib/conversation-engine";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";
import { buildDemoRecommendation } from "@/lib/demo-recommendation";
import type {
  ConversationEngineState,
  ConversationMessage,
  ConversationQuestion,
  ProcessingStage,
} from "@/types/orientation-chat";
import { useOrientationSession } from "@/hooks/useOrientationSession";

interface UseConversationDemoResult {
  messages: ConversationMessage[];
  currentQuestion: ConversationQuestion | null;
  isStarted: boolean;
  isAdvisorTyping: boolean;
  isSubmitting: boolean;
  isProcessing: boolean;
  processingStages: ProcessingStage[];
  processingIndex: number;
  flowError: string | null;
  canSend: boolean;
  startConversation: () => void;
  submitAnswer: (value: string) => Promise<void>;
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
  questionId?: ConversationMessage["questionId"],
): ConversationMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    content,
    status,
    questionId,
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

  const askAdvisorQuestion = useCallback(
    async (question: ConversationQuestion) => {
      setIsAdvisorTyping(true);
      await wait(560 + Math.floor(Math.random() * 320));

      const assistantMessage = createMessage(
        "assistant",
        question.prompt,
        "streaming",
        question.id,
      );

      setMessages((previous) => [...previous, assistantMessage]);
      setCurrentQuestion(question);
      setIsAdvisorTyping(false);

      trackFunnelEvent("question_asked", {
        questionId: question.id,
      });

      window.setTimeout(() => {
        markMessageComplete(assistantMessage.id);
      }, 950);
    },
    [markMessageComplete],
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
      branch: engineStateRef.current.branch ?? "balanced",
      topMajor: demoSnapshot.topMajors[0]?.majorName ?? "unknown",
    });

    router.push(orientationRoutes.demoResults);
  }, [router, setDemoResultSnapshot, setResultSnapshot]);

  const startConversation = useCallback(() => {
    if (isStarted) {
      return;
    }

    setResultSnapshot(null);
    setDemoResultSnapshot(null);
    setFlowError(null);
    setIsStarted(true);

    trackFunnelEvent("chat_started", {
      source: "orientation_demo",
    });

    const initialQuestion = getNextConversationQuestion(engineStateRef.current);
    if (!initialQuestion) {
      return;
    }

    void askAdvisorQuestion(initialQuestion);
  }, [askAdvisorQuestion, isStarted, setDemoResultSnapshot, setResultSnapshot]);

  const submitAnswer = useCallback(
    async (value: string) => {
      const cleanValue = value.trim();
      if (!cleanValue || !currentQuestion || isSubmitting || isAdvisorTyping || isProcessing) {
        return;
      }

      setIsSubmitting(true);

      try {
        const studentMessage = createMessage("student", cleanValue, "complete");
        setMessages((previous) => [...previous, studentMessage]);

        trackFunnelEvent("answer_submitted", {
          questionId: currentQuestion.id,
        });

        const previousBranch = engineStateRef.current.branch;
        const turn = submitConversationAnswer(
          engineStateRef.current,
          currentQuestion.id,
          cleanValue,
        );

        engineStateRef.current = turn.nextState;
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
          turn.nextState.branch &&
          previousBranch !== turn.nextState.branch &&
          turn.nextState.branch !== "balanced"
        ) {
          trackFunnelEvent("branch_selected", {
            branch: turn.nextState.branch,
          });
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