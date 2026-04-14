"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { orientationRoutes } from "@/config/routing";
import { WizardShell } from "@/components/orientation/WizardShell";
import { StepAcademicStrength } from "@/components/orientation/steps/StepAcademicStrength";
import { StepCareerIntent } from "@/components/orientation/steps/StepCareerIntent";
import { StepFeasibilityConstraints } from "@/components/orientation/steps/StepFeasibilityConstraints";
import { StepInterestMapping } from "@/components/orientation/steps/StepInterestMapping";
import { StepReview } from "@/components/orientation/steps/StepReview";
import { useOrientationWizard } from "@/hooks/useOrientationWizard";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

const stepMeta = {
  "academic-strength": {
    title: "Academic Strength Discovery",
    subtitle: "We map your strongest and weakest academic signals before recommending majors.",
    label: "Step 1 - Academic",
  },
  "interest-mapping": {
    title: "Interest Mapping",
    subtitle: "We identify what naturally attracts your curiosity and problem-solving style.",
    label: "Step 2 - Interests",
  },
  "career-intent": {
    title: "Career Intent",
    subtitle: "Your five-year direction sharpens the recommendation confidence.",
    label: "Step 3 - Career",
  },
  "feasibility-constraints": {
    title: "Feasibility and Constraints",
    subtitle: "Budget, scholarship need, and score constraints keep recommendations realistic.",
    label: "Step 4 - Feasibility",
  },
  review: {
    title: "Review and Confirm",
    subtitle: "One last check before your AI advisor composes the recommendation report.",
    label: "Step 5 - Review",
  },
} as const;

export default function OrientationWizardPage() {
  const router = useRouter();
  const wizard = useOrientationWizard();

  const stepDetails = stepMeta[wizard.activeStep];

  const isFirstStep = wizard.currentStepIndex === 0;
  const isFinalStep = wizard.currentStepIndex === wizard.steps.length - 1;

  const stepContent = useMemo(() => {
    if (wizard.activeStep === "academic-strength") {
      return (
        <StepAcademicStrength
          answers={wizard.draft.answers}
          updateAnswers={wizard.updateAnswers}
        />
      );
    }

    if (wizard.activeStep === "interest-mapping") {
      return (
        <StepInterestMapping
          answers={wizard.draft.answers}
          updateAnswers={wizard.updateAnswers}
        />
      );
    }

    if (wizard.activeStep === "career-intent") {
      return (
        <StepCareerIntent
          answers={wizard.draft.answers}
          updateAnswers={wizard.updateAnswers}
        />
      );
    }

    if (wizard.activeStep === "feasibility-constraints") {
      return (
        <StepFeasibilityConstraints
          answers={wizard.draft.answers}
          updateAnswers={wizard.updateAnswers}
        />
      );
    }

    return (
      <StepReview
        answers={wizard.draft.answers}
        updateAnswers={wizard.updateAnswers}
      />
    );
  }, [wizard.activeStep, wizard.draft.answers, wizard.updateAnswers]);

  const handleContinue = () => {
    if (isFinalStep) {
      trackFunnelEvent("orientation_submitted", {
        topDomain: wizard.draft.answers.preferredDomains[0] ?? "unknown",
      });
      router.push(orientationRoutes.analyzing);
      return;
    }

    wizard.nextStep();
  };

  return (
    <main>
      <WizardShell
        title={stepDetails.title}
        subtitle={stepDetails.subtitle}
        progressPercent={wizard.progressPercent}
        currentStepLabel={stepDetails.label}
        onBack={wizard.previousStep}
        onContinue={handleContinue}
        canContinue={wizard.canContinue}
        isFirstStep={isFirstStep}
        isFinalStep={isFinalStep}
      >
        {stepContent}
      </WizardShell>
    </main>
  );
}
