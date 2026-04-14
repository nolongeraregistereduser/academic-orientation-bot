"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { sessionKeys } from "@/config/demo-flags";
import { mockInitialAnswers } from "@/data/mock-orientation-answers";
import { mockStudentProfile } from "@/data/mock-student-profile";
import type {
  OrientationAnswers,
  OrientationWizardDraft,
  WizardStepId,
} from "@/types/orientation";
import type { OrientationResultSnapshot } from "@/types/scoring";

interface OrientationSessionContextValue {
  draft: OrientationWizardDraft;
  resultSnapshot: OrientationResultSnapshot | null;
  updateAnswers: (partial: Partial<OrientationAnswers>) => void;
  setActiveStep: (step: WizardStepId) => void;
  markStepCompleted: (step: WizardStepId) => void;
  setResultSnapshot: (snapshot: OrientationResultSnapshot | null) => void;
  resetSession: () => void;
}

const defaultDraft: OrientationWizardDraft = {
  activeStep: "academic-strength",
  profile: mockStudentProfile,
  answers: mockInitialAnswers,
  completedSteps: [],
};

function readDraftFromSessionStorage(): OrientationWizardDraft {
  if (typeof window === "undefined") {
    return defaultDraft;
  }

  const raw = window.sessionStorage.getItem(sessionKeys.wizardDraft);
  if (!raw) {
    return defaultDraft;
  }

  try {
    return JSON.parse(raw) as OrientationWizardDraft;
  } catch {
    return defaultDraft;
  }
}

function readSnapshotFromSessionStorage(): OrientationResultSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(sessionKeys.resultSnapshot);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as OrientationResultSnapshot;
  } catch {
    return null;
  }
}

const OrientationSessionContext = createContext<OrientationSessionContextValue | null>(null);

export function OrientationSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<OrientationWizardDraft>(
    readDraftFromSessionStorage,
  );
  const [resultSnapshot, setResultSnapshotState] =
    useState<OrientationResultSnapshot | null>(readSnapshotFromSessionStorage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(sessionKeys.wizardDraft, JSON.stringify(draft));
  }, [draft]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!resultSnapshot) {
      window.sessionStorage.removeItem(sessionKeys.resultSnapshot);
      return;
    }

    window.sessionStorage.setItem(
      sessionKeys.resultSnapshot,
      JSON.stringify(resultSnapshot),
    );
  }, [resultSnapshot]);

  const updateAnswers = useCallback((partial: Partial<OrientationAnswers>) => {
    setDraft((previous) => ({
      ...previous,
      answers: {
        ...previous.answers,
        ...partial,
      },
    }));
  }, []);

  const setActiveStep = useCallback((step: WizardStepId) => {
    setDraft((previous) => ({
      ...previous,
      activeStep: step,
    }));
  }, []);

  const markStepCompleted = useCallback((step: WizardStepId) => {
    setDraft((previous) => {
      if (previous.completedSteps.includes(step)) {
        return previous;
      }

      return {
        ...previous,
        completedSteps: [...previous.completedSteps, step],
      };
    });
  }, []);

  const setResultSnapshot = useCallback(
    (snapshot: OrientationResultSnapshot | null) => {
      setResultSnapshotState(snapshot);
    },
    [],
  );

  const resetSession = useCallback(() => {
    setDraft(defaultDraft);
    setResultSnapshotState(null);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(sessionKeys.wizardDraft);
      window.sessionStorage.removeItem(sessionKeys.resultSnapshot);
    }
  }, []);

  const value = useMemo<OrientationSessionContextValue>(() => {
    return {
      draft,
      resultSnapshot,
      updateAnswers,
      setActiveStep,
      markStepCompleted,
      setResultSnapshot,
      resetSession,
    };
  }, [
    draft,
    markStepCompleted,
    resetSession,
    resultSnapshot,
    setActiveStep,
    setResultSnapshot,
    updateAnswers,
  ]);

  return (
    <OrientationSessionContext.Provider value={value}>
      {children}
    </OrientationSessionContext.Provider>
  );
}

export function useOrientationSession(): OrientationSessionContextValue {
  const context = useContext(OrientationSessionContext);

  if (!context) {
    throw new Error("useOrientationSession must be used inside OrientationSessionProvider");
  }

  return context;
}
