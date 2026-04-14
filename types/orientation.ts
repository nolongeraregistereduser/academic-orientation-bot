export type WizardStepId =
  | "academic-strength"
  | "interest-mapping"
  | "career-intent"
  | "feasibility-constraints"
  | "review";

export interface StudentProfileContext {
  firstName: string;
  lastName: string;
  gender: "female" | "male" | "other";
  nationality: string;
  residenceCountry: string;
  currentEducationLevel: "high-school" | "bachelor" | "master";
  currentProgram: string;
  currentYear: string;
  currentMajor: string;
  expectedGraduationDate: string;
  institutionName: string;
  preferredDestinations: string[];
  intendedProgramType: "bachelor" | "master" | "phd" | "mba";
  intendedMajors: string[];
  intendedStartTerm: "spring" | "summer" | "fall";
  intendedStartYear: number;
}

export interface OrientationAnswers {
  strongestSubjects: string[];
  dislikedSubjects: string[];
  enjoysQuantitativeProblemSolving: 1 | 2 | 3 | 4 | 5;
  practicalVsTheoryPreference: "practical" | "balanced" | "theory";
  researchComfortLevel: 1 | 2 | 3 | 4 | 5;

  curiosityTopics: string[];
  preferredDomains: Array<
    | "business"
    | "technology"
    | "health"
    | "creativity"
    | "law"
    | "engineering"
    | "social-sciences"
  >;
  favoriteProblemTypes: string[];

  fiveYearCareerVision: string;
  salaryVsPassion: "salary-first" | "balanced" | "passion-first";
  corporateVsEntrepreneurship: "corporate" | "balanced" | "entrepreneurship";
  remoteVsOnsite: "remote" | "hybrid" | "on-site";
  leadershipVsSpecialist: "leadership" | "balanced" | "technical-specialist";

  maxAnnualTuitionBudgetUsd: number;
  maxMonthlyLivingBudgetUsd: number;
  scholarshipNeed: "none" | "moderate" | "high";
  visaPreference: "f1-focused" | "flexible";
  countryFlexibility: "usa-only" | "usa-priority" | "open";
  bankStatementCapacityUsd: number;
  englishScore: number;

  teamworkStyle: "solo" | "balanced" | "team";
  thinkingStyle: "creative" | "balanced" | "analytical";
}

export interface OrientationSessionInput {
  profile: StudentProfileContext;
  answers: OrientationAnswers;
}

export interface OrientationWizardDraft {
  activeStep: WizardStepId;
  profile: StudentProfileContext;
  answers: OrientationAnswers;
  completedSteps: WizardStepId[];
}
