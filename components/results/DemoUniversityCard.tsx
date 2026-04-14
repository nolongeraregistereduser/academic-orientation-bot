import type { DemoUniversityResult } from "@/types/orientation-chat";

interface DemoUniversityCardProps {
  match: DemoUniversityResult;
}

function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DemoUniversityCard({ match }: DemoUniversityCardProps) {
  return (
    <article className="rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)] p-5 shadow-[var(--demo-shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-[var(--demo-text)]">{match.universityName}</h3>
          <p className="text-xs text-[var(--demo-muted)]">{match.location}</p>
        </div>
        <p className="text-lg font-black text-[var(--demo-text)]">{match.fitPercent}%</p>
      </div>

      <p className="mt-3 text-sm font-semibold text-[var(--demo-text)]">
        Tuition {currency(match.yearlyTuitionUsd)} / year
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--demo-muted)]">
        Scholarship potential {match.scholarshipPercent}%
      </p>

      <p className="mt-3 text-sm leading-6 text-[var(--demo-muted)]">{match.whyItMatches}</p>
    </article>
  );
}
