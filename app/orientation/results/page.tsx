"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { orientationRoutes } from "@/config/routing";
import { ExplanationPanel } from "@/components/orientation/results/ExplanationPanel";
import { MajorRankCard } from "@/components/orientation/results/MajorRankCard";
import { NextBestActionPanel } from "@/components/orientation/results/NextBestActionPanel";
import { PremiumInsightsLock } from "@/components/orientation/results/PremiumInsightsLock";
import { ResultsHeader } from "@/components/orientation/results/ResultsHeader";
import { ScoreBreakdownPanel } from "@/components/orientation/results/ScoreBreakdownPanel";
import { UniversityMatchGrid } from "@/components/orientation/university/UniversityMatchGrid";
import { useOrientationSession } from "@/hooks/useOrientationSession";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export default function OrientationResultsPage() {
  const router = useRouter();
  const { resultSnapshot } = useOrientationSession();

  useEffect(() => {
    if (!resultSnapshot) {
      router.replace(orientationRoutes.wizard);
      return;
    }

    trackFunnelEvent("results_viewed", {
      topMajor: resultSnapshot.topMajors[0]?.majorName ?? "unknown",
      confidence: resultSnapshot.confidenceAverage,
    });
  }, [resultSnapshot, router]);

  if (!resultSnapshot) {
    return null;
  }

  const topMajor = resultSnapshot.topMajors[0];

  return (
    <main className="space-y-6">
      <ResultsHeader snapshot={resultSnapshot} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resultSnapshot.topMajors.map((major, index) => (
          <MajorRankCard key={major.majorId} major={major} rank={index + 1} />
        ))}
      </section>

      {topMajor ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <ScoreBreakdownPanel major={topMajor} />
          <ExplanationPanel major={topMajor} />
        </section>
      ) : null}

      <UniversityMatchGrid matches={resultSnapshot.topUniversityMatches} />
      <PremiumInsightsLock />
      <NextBestActionPanel />
    </main>
  );
}
