export type DegreeLevel = "bachelor" | "master" | "phd" | "mba";

export interface University {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  brandTier: "elite" | "high" | "solid";
  averageMonthlyLivingCostUsd: number;
  website: string;
}

export interface UniversityProgram {
  id: string;
  universityId: string;
  programName: string;
  normalizedMajorId: string;
  degreeLevel: DegreeLevel;
  annualTuitionUsd: number;
  durationYears: number;
  intakeTerms: Array<"spring" | "summer" | "fall">;
  minimumEnglishScore: number;
  stem: boolean;
  scholarshipAvailable: boolean;
}

export interface UniversityProgramMatch {
  universityId: string;
  universityName: string;
  universityTier: University["brandTier"];
  location: string;
  programId: string;
  normalizedMajorId: string;
  programName: string;
  degreeLevel: DegreeLevel;
  annualTuitionUsd: number;
  monthlyLivingCostUsd: number;
  yearlyTotalCostUsd: number;
  fitScore: number;
  budgetFit: "within-budget" | "stretch" | "over-budget";
  eligibility: "eligible" | "at-risk";
  stem: boolean;
  scholarshipAvailable: boolean;
}
