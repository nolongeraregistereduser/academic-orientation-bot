import { salaryAndCareerOutcomes } from "@/data/salary-and-career-outcomes";
import { localOrientationPipelineService } from "@/lib/services/local/localOrientationPipelineService";
import type { OrientationScoringInput } from "@/types/scoring";
import type {
  DemoMajorResult,
  DemoRecommendationSnapshot,
  DemoUniversityResult,
} from "@/types/orientation-chat";
import type { UniversityProgramMatch } from "@/types/university";

function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function estimateScholarshipPercent(match: UniversityProgramMatch): number {
  if (!match.scholarshipAvailable) {
    return 0;
  }

  const base =
    match.universityTier === "elite"
      ? 14
      : match.universityTier === "high"
        ? 20
        : 28;

  const budgetBoost =
    match.budgetFit === "over-budget" ? 10 : match.budgetFit === "stretch" ? 6 : 2;
  const stemBoost = match.stem ? 4 : 0;

  return Math.min(45, base + budgetBoost + stemBoost);
}

function buildWhyItMatches(match: UniversityProgramMatch): string {
  const budgetLine =
    match.budgetFit === "within-budget"
      ? "a budget-safe cost profile"
      : match.budgetFit === "stretch"
        ? "a manageable stretch budget profile"
        : "a higher-cost profile with scholarship upside";

  const eligibilityLine =
    match.eligibility === "eligible"
      ? "solid current eligibility signals"
      : "an at-risk eligibility profile that can be improved";

  return `${match.programName} stands out with a ${match.fitScore}% fit, ${budgetLine}, and ${eligibilityLine}.`;
}

function mapMajorResult(
  input: OrientationScoringInput,
  major: {
  majorId: string;
  majorName: string;
  totalScore: number;
  advisorNarrative: string;
  careerOutlook: string;
  confidence: number;
},
): DemoMajorResult {
  const career = salaryAndCareerOutcomes[major.majorId];
  const medianSalary = career ? currency(career.medianSalaryUsd) : "Competitive";

  return {
    majorId: major.majorId,
    majorName: major.majorName,
    fitPercent: major.totalScore,
    explanation: major.advisorNarrative,
    salaryOutlook: `${major.careerOutlook} Median salary: ${medianSalary}.`,
    careerExamples:
      career?.roles.slice(0, 3) ??
      [
        "Industry Analyst",
        "Strategy Associate",
        "Operations Specialist",
      ],
    confidence: major.confidence,
  };
}

function mapUniversityResult(match: UniversityProgramMatch): DemoUniversityResult {
  const scholarshipPercent = estimateScholarshipPercent(match);

  return {
    programId: match.programId,
    universityName: match.universityName,
    location: match.location,
    fitPercent: match.fitScore,
    yearlyTuitionUsd: match.annualTuitionUsd,
    scholarshipPercent,
    whyItMatches: buildWhyItMatches(match),
  };
}

function buildCounselorSummary(
  input: OrientationScoringInput,
  topMajor: DemoMajorResult | undefined,
): string {
  if (!topMajor) {
    return "Your profile is promising, but we need one more pass to sharpen the recommendation confidence.";
  }

  const strongest = input.answers.strongestSubjects.slice(0, 2).join(" and ");
  const style = input.answers.thinkingStyle;
  const values = input.answers.coreValues.slice(0, 2).join(" and ");

  const gpaLabel =
    input.answers.gpaRange === "3-6-to-4-0"
      ? "a high GPA trajectory"
      : input.answers.gpaRange === "3-2-to-3-6"
        ? "a strong GPA trajectory"
        : input.answers.gpaRange === "2-8-to-3-2"
          ? "a developing GPA profile"
          : "a rebuilding academic profile";

  return `Your strong fit for ${topMajor.majorName} comes from ${gpaLabel}, your comfort with ${strongest}, your ${style} work style, and your values around ${values}. Combined with your long-term direction in ${input.answers.fiveYearCareerVision}, this recommendation is both ambitious and realistic.`;
}

export async function buildDemoRecommendation(
  input: OrientationScoringInput,
): Promise<DemoRecommendationSnapshot> {
  const rawSnapshot = await localOrientationPipelineService.runOrientation(input);

  const topMajors = rawSnapshot.topMajors
    .slice(0, 3)
    .map((major) => mapMajorResult(input, major));
  const counselorSummary = buildCounselorSummary(input, topMajors[0]);
  const matchedUniversities = rawSnapshot.topUniversityMatches
    .slice(0, 6)
    .map(mapUniversityResult);

  const topMajorSlug = (topMajors[0]?.majorName ?? "business-analytics")
    .toLowerCase()
    .replaceAll(" ", "-");

  const ctaHref = `/explorer?demo=1&major=${encodeURIComponent(topMajorSlug)}&destination=united-states`;

  return {
    generatedAtIso: new Date().toISOString(),
    topMajors,
    counselorSummary,
    matchedUniversities,
    ctaHref,
    rawSnapshot,
  };
}