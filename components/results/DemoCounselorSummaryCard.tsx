interface DemoCounselorSummaryCardProps {
  summary: string;
}

export function DemoCounselorSummaryCard({ summary }: DemoCounselorSummaryCardProps) {
  return (
    <section className="rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)] p-6 shadow-[var(--demo-shadow-soft)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--demo-muted)]">
        AI Counselor Summary
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--demo-text)]">{summary}</p>
    </section>
  );
}
