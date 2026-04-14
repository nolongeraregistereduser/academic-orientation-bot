"use client";

import { useEffect, useMemo, useState } from "react";
import { demoFlags } from "@/config/demo-flags";

const ANALYSIS_STAGES = [
  "Loading pre-filled academic context",
  "Scoring major fit dimensions",
  "Mapping realistic US programs",
  "Drafting counselor explanation",
  "Finalizing premium recommendation",
];

export function useAnalysisSimulation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = demoFlags.enableAnalysisDelaySimulation
      ? Math.floor(
          Math.random() *
            (demoFlags.maxAnalysisDelayMs - demoFlags.minAnalysisDelayMs + 1),
        ) + demoFlags.minAnalysisDelayMs
      : 800;

    const perStageMs = Math.max(Math.floor(duration / ANALYSIS_STAGES.length), 380);

    const interval = window.setInterval(() => {
      setActiveIndex((previous) => {
        if (previous >= ANALYSIS_STAGES.length - 1) {
          window.clearInterval(interval);
          setIsComplete(true);
          return previous;
        }

        return previous + 1;
      });
    }, perStageMs);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const progressPercent = useMemo(() => {
    return Math.round(((activeIndex + 1) / ANALYSIS_STAGES.length) * 100);
  }, [activeIndex]);

  return {
    stages: ANALYSIS_STAGES,
    activeIndex,
    progressPercent,
    isComplete,
  };
}
