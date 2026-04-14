"use client";

import { useCallback, useState } from "react";
import { localOrientationPipelineService } from "@/lib/services/local/localOrientationPipelineService";
import type { OrientationResultSnapshot } from "@/types/scoring";
import { useOrientationSession } from "@/hooks/useOrientationSession";

export function useResultsAssembler() {
  const { draft, setResultSnapshot } = useOrientationSession();
  const [isAssembling, setIsAssembling] = useState(false);
  const [assemblyError, setAssemblyError] = useState<string | null>(null);

  const assembleResults = useCallback(async (): Promise<OrientationResultSnapshot | null> => {
    try {
      setIsAssembling(true);
      setAssemblyError(null);

      const snapshot = await localOrientationPipelineService.runOrientation({
        profile: draft.profile,
        answers: draft.answers,
      });

      setResultSnapshot(snapshot);
      return snapshot;
    } catch (error) {
      setAssemblyError(
        error instanceof Error
          ? error.message
          : "Unable to generate orientation result snapshot.",
      );
      return null;
    } finally {
      setIsAssembling(false);
    }
  }, [draft.answers, draft.profile, setResultSnapshot]);

  return {
    assembleResults,
    isAssembling,
    assemblyError,
  };
}
