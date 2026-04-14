export type WizardStepId =
  | "academic-strength"
  | "interest-mapping"
  | "career-intent"
  | "feasibility-constraints"
  | "review";

export type GpaRange =
  | "below-2-8"
  | "2-8-to-3-2"
  | "3-2-to-3-6"
  | "3-6-to-4-0";

export type PeopleDataIdeasPreference = "people" | "data" | "ideas" | "blend";

export type WorkStructurePreference = "structured" | "balanced" | "open-ended";

export type DetailVsBigPicturePreference = "detail" | "balanced" | "big-picture";

export type WorkEnvironmentPreference = "desk" | "field" | "hybrid";

export type DecisionPriority = "salary" | "impact" | "prestige" | "balanced";

export type OrganizationPreference =
  | "company"
  | "startup"
  | "entrepreneur"
  | "nonprofit"
  | "undecided";

export type GrowthVsBalancePreference =
  | "work-life-balance"
  | "balanced"
  | "high-growth";

export type DegreeDurationPreference = "1-year" | "2-year" | "3-plus-years" | "flexible";

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

  gpaRange: GpaRange;
  advancedCourseExposure: string[];
  freeTimeTopics: string[];
  peopleDataIdeasPreference: PeopleDataIdeasPreference;
  extracurricularProfiles: string[];
  workStructurePreference: WorkStructurePreference;
  detailVsBigPicturePreference: DetailVsBigPicturePreference;
  workEnvironmentPreference: WorkEnvironmentPreference;
  desiredCareerTrack: string;
  decisionPriority: DecisionPriority;
  organizationPreference: OrganizationPreference;
  growthVsBalancePreference: GrowthVsBalancePreference;
  preferredUsStates: string[];
  degreeDurationPreference: DegreeDurationPreference;
  selfPerceivedStrengths: string[];
  helpRequestThemes: string[];
  coreValues: string[];
  regretPromptReflection: string;
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
