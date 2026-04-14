import { generateMajorExplanation } from "@/lib/ai-explanations/generateMajorExplanation";
import { generateStudentSummary } from "@/lib/ai-explanations/generateStudentSummary";
import { salaryAndCareerOutcomes } from "@/data/salary-and-career-outcomes";
import type {
  MajorRecommendation,
  OrientationResultSnapshot,
  OrientationScoringInput,
} from "@/types/scoring";
import type { OrientationPipelineService } from "@/types/services";
import { localExplanationService } from "@/lib/services/local/localExplanationService";
import { localScoringService } from "@/lib/services/local/localScoringService";
import { localUniversityMatchService } from "@/lib/services/local/localUniversityMatchService";

export const localOrientationPipelineService: OrientationPipelineService = {
  async runOrientation(
    input: OrientationScoringInput,
  ): Promise<OrientationResultSnapshot> {
    const allRankedMajors = await localScoringService.scoreMajors(input);
    const explainabilitySignals =
      await localExplanationService.buildExplainabilitySignals(allRankedMajors);

    const topMajorsBase = allRankedMajors.slice(0, 5);
    const allProgramMatches = await localUniversityMatchService.matchPrograms(
      input,
      topMajorsBase,
    );

    const topMajors: MajorRecommendation[] = topMajorsBase.map((majorScore) => {
      const majorPrograms = allProgramMatches
        .filter((program) => program.normalizedMajorId === majorScore.majorId)
        .slice(0, 4);

      const signal = explainabilitySignals.find(
        (candidate) => candidate.majorId === majorScore.majorId,
      );

      const fallbackSignal = {
        majorId: majorScore.majorId,
        strongestSignals: ["Strong profile overlap with this major."],
        cautionSignals: ["Monitor funding and admissions requirements."],
        recommendedActions: ["Build a shortlist of safe and reach programs."],
      };

      const explanation = generateMajorExplanation(
        input,
        majorScore,
        signal ?? fallbackSignal,
        majorPrograms,
      );

      const career = salaryAndCareerOutcomes[majorScore.majorId];

      return {
        ...majorScore,
        explainability: signal ?? fallbackSignal,
        advisorNarrative: explanation.advisorNarrative,
        tuitionFeasibilityInsight: explanation.tuitionFeasibilityInsight,
        careerOutlook: career?.outlook ?? "Career outlook based on adjacent market demand.",
        matchedPrograms: majorPrograms,
      };
    });

    const topMajorName = topMajors[0]?.majorName ?? "Business Analytics";
    const executiveSummary =
      await localExplanationService.generateExecutiveSummary(input, topMajorName);

    return {
      generatedAtIso: new Date().toISOString(),
      studentDisplayName: `${input.profile.firstName} ${input.profile.lastName}`,
      profileSummary: generateStudentSummary(input),
      topMajors,
      allRankedMajors,
      topUniversityMatches: allProgramMatches.slice(0, 8),
      confidenceAverage: Math.round(
        topMajors.reduce((sum, major) => sum + major.confidence, 0) /
          Math.max(topMajors.length, 1),
      ),
      executiveSummary,
    };
  },
};
