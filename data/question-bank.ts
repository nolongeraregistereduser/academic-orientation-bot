import type { WizardStepId } from "@/types/orientation";

export interface WizardQuestion {
  id: string;
  stepId: WizardStepId;
  label: string;
  helper: string;
}

export const questionBank: WizardQuestion[] = [
  {
    id: "strongest-subjects",
    stepId: "academic-strength",
    label: "What are your strongest 3 subjects?",
    helper: "Use short tags like Math, Statistics, Economics.",
  },
  {
    id: "disliked-subjects",
    stepId: "academic-strength",
    label: "Which subjects do you dislike?",
    helper: "This helps avoid poor-fit recommendations.",
  },
  {
    id: "domains",
    stepId: "interest-mapping",
    label: "Which domains pull your curiosity the most?",
    helper: "Pick business, technology, health, creativity, law, engineering, or social sciences.",
  },
  {
    id: "career-vision",
    stepId: "career-intent",
    label: "What career do you imagine in 5 years?",
    helper: "Share role direction and work style preferences.",
  },
  {
    id: "tuition-budget",
    stepId: "feasibility-constraints",
    label: "What is your maximum tuition budget per year?",
    helper: "Use USD yearly amount.",
  },
];

export const wizardStepOrder: WizardStepId[] = [
  "academic-strength",
  "interest-mapping",
  "career-intent",
  "feasibility-constraints",
  "review",
];
