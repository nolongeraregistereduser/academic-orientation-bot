import type { DemoRecommendationSnapshot } from "@/types/orientation-chat";

interface DemoResultsHeroProps {
  snapshot: DemoRecommendationSnapshot;
}

export function DemoResultsHero({ snapshot }: DemoResultsHeroProps) {
  const topMajor = snapshot.topMajors[0]?.majorName ?? "Best-fit major";

  return (
    <section className="rounded-[1.75rem] border border-[var(--demo-border)] bg-[linear-gradient(120deg,var(--demo-card)_0%,var(--demo-surface)_100%)] p-6 shadow-[var(--demo-shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--demo-muted)]">
        Vantery AI Counselor Report
      </p>
      <h1 className="mt-2 text-2xl font-black text-[var(--demo-text)] md:text-4xl">
        Your strongest pathway is {topMajor}
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--demo-muted)]">
        Built from your conversation, this recommendation balances academic strength, career intent,
        and US affordability constraints to produce a counselor-style shortlist.
      </p>
      <div className="mt-4 inline-flex rounded-full border border-[var(--demo-border)] bg-[var(--demo-shell)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--demo-text)]">
        Generated {new Date(snapshot.generatedAtIso).toLocaleTimeString()}
      </div>
    </section>
  );
}
