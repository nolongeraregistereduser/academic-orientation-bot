"use client";

import { useMemo } from "react";
import { wizardStepOrder } from "@/data/question-bank";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";
import type { WizardStepId } from "@/types/orientation";
import { useOrientationSession } from "@/hooks/useOrientationSession";

function validateStep(stepId: WizardStepId, answers: ReturnType<typeof useOrientationSession>["draft"]["answers"]): boolean {
  if (stepId === "academic-strength") {
    return answers.strongestSubjects.length >= 2;
  }

  if (stepId === "interest-mapping") {
    return answers.preferredDomains.length >= 1 && answers.curiosityTopics.length >= 1;
  }

  if (stepId === "career-intent") {
    return answers.fiveYearCareerVision.trim().length >= 10;
  }

  if (stepId === "feasibility-constraints") {
    return answers.maxAnnualTuitionBudgetUsd > 0 && answers.englishScore > 0;
  }

  return true;
}

export function useOrientationWizard() {
  const session = useOrientationSession();
  const currentStepIndex = wizardStepOrder.indexOf(session.draft.activeStep);

  const canContinue = validateStep(session.draft.activeStep, session.draft.answers);

  const progressPercent = useMemo(() => {
    return Math.round(((currentStepIndex + 1) / wizardStepOrder.length) * 100);
  }, [currentStepIndex]);

  const nextStep = () => {
    if (!canContinue) {
      return;
    }

    const currentStep = wizardStepOrder[currentStepIndex];
    session.markStepCompleted(currentStep);
    trackFunnelEvent("wizard_step_completed", { step: currentStep });

    const next = wizardStepOrder[currentStepIndex + 1];
    if (next) {
      session.setActiveStep(next);
    }
  };

  const previousStep = () => {
    const previous = wizardStepOrder[currentStepIndex - 1];
    if (previous) {
      session.setActiveStep(previous);
    }
  };

  const goToStep = (step: WizardStepId) => {
    session.setActiveStep(step);
  };

  return {
    steps: wizardStepOrder,
    activeStep: session.draft.activeStep,
    currentStepIndex,
    progressPercent,
    canContinue,
    nextStep,
    previousStep,
    goToStep,
    draft: session.draft,
    updateAnswers: session.updateAnswers,
    markStepCompleted: session.markStepCompleted,
  };
}
