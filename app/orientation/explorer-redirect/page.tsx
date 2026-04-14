"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExplorerRedirectCta } from "@/components/orientation/cta/ExplorerRedirectCta";
import { orientationRoutes } from "@/config/routing";
import { useOrientationSession } from "@/hooks/useOrientationSession";

export default function OrientationExplorerRedirectPage() {
  const router = useRouter();
  const { resultSnapshot } = useOrientationSession();

  useEffect(() => {
    if (!resultSnapshot) {
      router.replace(orientationRoutes.results);
    }
  }, [resultSnapshot, router]);

  if (!resultSnapshot) {
    return null;
  }

  return (
    <main className="space-y-4">
      <section className="rounded-3xl border border-black/10 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-black/60">Phase 5</p>
        <h1 className="mt-2 text-2xl font-black text-[var(--brand-ink)] md:text-3xl">
          Redirect to University Explorer with pre-applied filters
        </h1>
        <p className="mt-3 text-sm text-black/70">
          This handoff demonstrates how orientation outputs drive your existing Vantery acquisition funnel.
        </p>
      </section>
      <ExplorerRedirectCta snapshot={resultSnapshot} />
    </main>
  );
}
