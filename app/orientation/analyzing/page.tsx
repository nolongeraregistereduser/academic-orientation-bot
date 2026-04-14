"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { orientationRoutes } from "@/config/routing";
import { AnalysisTimeline } from "@/components/orientation/ai/AnalysisTimeline";
import { InsightPulse } from "@/components/orientation/ai/InsightPulse";
import { useAnalysisSimulation } from "@/hooks/useAnalysisSimulation";
import { useOrientationSession } from "@/hooks/useOrientationSession";
import { useResultsAssembler } from "@/hooks/useResultsAssembler";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export default function OrientationAnalyzingPage() {
  const router = useRouter();
  const { resultSnapshot } = useOrientationSession();
  const { assembleResults, assemblyError } = useResultsAssembler();
  const simulation = useAnalysisSimulation();

  useEffect(() => {
    void assembleResults();
  }, [assembleResults]);

  useEffect(() => {
    if (!simulation.isComplete || !resultSnapshot) {
      return;
    }

    trackFunnelEvent("analysis_completed", {
      topMajor: resultSnapshot.topMajors[0]?.majorName ?? "unknown",
    });

    router.replace(orientationRoutes.results);
  }, [resultSnapshot, router, simulation.isComplete]);

  if (assemblyError) {
    return (
      <main className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-black text-red-700">Unable to complete analysis</h1>
        <p className="mt-2 text-sm text-red-700">{assemblyError}</p>
      </main>
    );
  }

  return (
    <main className="grid min-h-[72vh] items-center gap-8 rounded-3xl border border-black/10 bg-white/70 p-8 md:grid-cols-[220px_1fr]">
      <div className="mx-auto">
        <InsightPulse />
      </div>
      <AnalysisTimeline
        stages={simulation.stages}
        activeIndex={simulation.activeIndex}
        progressPercent={simulation.progressPercent}
      />
    </main>
  );
}
