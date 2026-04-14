"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/chat/ThemeToggle";
import { DemoCounselorSummaryCard } from "@/components/results/DemoCounselorSummaryCard";
import { DemoMajorCard } from "@/components/results/DemoMajorCard";
import { DemoNextActionBar } from "@/components/results/DemoNextActionBar";
import { DemoResultsHero } from "@/components/results/DemoResultsHero";
import { DemoUniversityCard } from "@/components/results/DemoUniversityCard";
import { orientationRoutes } from "@/config/routing";
import { useOrientationSession } from "@/hooks/useOrientationSession";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export default function OrientationDemoResultsPage() {
  const router = useRouter();
  const { demoResultSnapshot } = useOrientationSession();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!demoResultSnapshot) {
      router.replace(orientationRoutes.demo);
      return;
    }

    trackFunnelEvent("demo_results_viewed", {
      topMajor: demoResultSnapshot.topMajors[0]?.majorName ?? "unknown",
    });
  }, [demoResultSnapshot, router]);

  if (!demoResultSnapshot) {
    return null;
  }

  return (
    <main className={`demo-theme-${theme} min-h-[82vh] space-y-5`}>
      <section className="mx-auto w-full max-w-6xl space-y-5">
        <header className="flex justify-end">
          <ThemeToggle
            theme={theme}
            onToggle={() => {
              setTheme((previous) => (previous === "light" ? "dark" : "light"));
            }}
          />
        </header>

        <DemoResultsHero snapshot={demoResultSnapshot} />

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[var(--demo-text)]">Your Best-Fit Majors</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {demoResultSnapshot.topMajors.map((major, index) => (
              <DemoMajorCard key={major.majorId} major={major} rank={index + 1} />
            ))}
          </div>
        </section>

        <DemoCounselorSummaryCard summary={demoResultSnapshot.counselorSummary} />

        <section className="space-y-3">
          <h2 className="text-xl font-black text-[var(--demo-text)]">Matched US Universities</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {demoResultSnapshot.matchedUniversities.map((university) => (
              <DemoUniversityCard key={university.programId} match={university} />
            ))}
          </div>
        </section>

        <DemoNextActionBar href={demoResultSnapshot.ctaHref} />
      </section>
    </main>
  );
}
