import type { OrientationResultSnapshot } from "@/types/scoring";

interface ResultsHeaderProps {
  snapshot: OrientationResultSnapshot;
}

export function ResultsHeader({ snapshot }: ResultsHeaderProps) {
  return (
    <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#fffbe7_0%,#e6f6ff_100%)] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
        Orientation Result Snapshot
      </p>
      <h1 className="mt-2 text-2xl font-black text-[var(--brand-ink)] md:text-4xl">
        {snapshot.studentDisplayName}, your strongest pathway is {snapshot.topMajors[0]?.majorName}.
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70">{snapshot.executiveSummary}</p>
      <div className="mt-4 inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
        Avg Confidence {snapshot.confidenceAverage}%
      </div>
    </section>
  );
}
