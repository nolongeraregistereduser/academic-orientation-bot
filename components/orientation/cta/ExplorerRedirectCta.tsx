"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { OrientationResultSnapshot } from "@/types/scoring";

interface ExplorerRedirectCtaProps {
  snapshot: OrientationResultSnapshot;
}

export function ExplorerRedirectCta({ snapshot }: ExplorerRedirectCtaProps) {
  const href = useMemo(() => {
    const topMajor = snapshot.topMajors[0];
    const params = new URLSearchParams({
      demo: "1",
      major: topMajor?.majorName ?? "Business Analytics",
      budget: String(topMajor?.breakdown.financialFeasibility ?? 0),
      destination: "United States",
    });

    return `/explorer?${params.toString()}`;
  }, [snapshot.topMajors]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6">
      <h2 className="text-xl font-black text-[var(--brand-ink)]">Continue to University Explorer</h2>
      <p className="mt-2 text-sm text-black/70">
        Your top-fit filters are pre-computed and ready. This closes the orientation-to-application funnel.
      </p>
      <div className="mt-4">
        <Link href={href}>
          <Button>Open Explorer With Filters</Button>
        </Link>
      </div>
      <p className="mt-3 text-xs text-black/50">Demo link points to your main app explorer route contract.</p>
    </div>
  );
}
