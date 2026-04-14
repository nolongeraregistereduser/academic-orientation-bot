import type { OrientationScoringInput } from "@/types/scoring";

export interface RuleLayerAdjustment {
  academicFit: number;
  interestFit: number;
  careerFit: number;
  personalityFit: number;
  rationale: string[];
  confidenceBonus: number;
}

function includesAny(values: string[], keywords: string[]): boolean {
  return keywords.some((keyword) => values.includes(keyword));
}

export function applyDeterministicRuleLayer(
  input: OrientationScoringInput,
  majorId: string,
): RuleLayerAdjustment {
  const subjects = input.answers.strongestSubjects.map((value) => value.toLowerCase());
  const clubs = input.answers.extracurricularProfiles.map((value) => value.toLowerCase());
  const strengths = input.answers.selfPerceivedStrengths.map((value) => value.toLowerCase());
  const values = input.answers.coreValues.map((value) => value.toLowerCase());

  let academicFit = 0;
  let interestFit = 0;
  let careerFit = 0;
  let personalityFit = 0;
  let confidenceBonus = 0;
  const rationale: string[] = [];

  const hasStrongGpa = ["3-2-to-3-6", "3-6-to-4-0"].includes(input.answers.gpaRange);
  const hasQuantStrength = includesAny(subjects, ["math", "statistics", "computer science", "economics"]);
  const quantMajors = new Set([
    "finance",
    "business-analytics",
    "data-science",
    "computer-science",
    "industrial-engineering",
  ]);

  if (hasStrongGpa && hasQuantStrength && quantMajors.has(majorId)) {
    academicFit += 3;
    interestFit += 2;
    confidenceBonus += 2;
    rationale.push(
      "High GPA with quantitative subject strength boosts fit for quant-intensive tracks.",
    );
  }

  const leadershipSignal =
    input.answers.leadershipVsSpecialist === "leadership" || strengths.includes("leadership");
  const businessClubSignal = includesAny(clubs, ["business club", "student government", "sports captain"]);
  const leadershipMajors = new Set(["business-analytics", "finance", "industrial-engineering"]);

  if (leadershipSignal && businessClubSignal && leadershipMajors.has(majorId)) {
    careerFit += 3;
    personalityFit += 2;
    confidenceBonus += 2;
    rationale.push(
      "Leadership profile and business-club exposure increase management-oriented major confidence.",
    );
  }

  const isCreativeOpenEnded =
    input.answers.thinkingStyle === "creative" &&
    input.answers.workStructurePreference === "open-ended";
  const creativeMajors = new Set(["ux-design", "business-analytics", "psychology"]);

  if (isCreativeOpenEnded && creativeMajors.has(majorId)) {
    interestFit += 3;
    personalityFit += 1;
    confidenceBonus += 1;
    rationale.push("Creative and open-ended work preference favors design and human-centered majors.");
  }

  const socialImpactSignal =
    input.answers.decisionPriority === "impact" ||
    input.answers.organizationPreference === "nonprofit" ||
    values.includes("impact") ||
    values.includes("community");
  const impactMajors = new Set(["public-policy", "psychology", "public-health"]);

  if (socialImpactSignal && impactMajors.has(majorId)) {
    careerFit += 4;
    interestFit += 2;
    confidenceBonus += 3;
    rationale.push(
      "Social-impact and NGO preference strongly improve fit for policy and psychology pathways.",
    );
  }

  return {
    academicFit,
    interestFit,
    careerFit,
    personalityFit,
    confidenceBonus,
    rationale,
  };
}
