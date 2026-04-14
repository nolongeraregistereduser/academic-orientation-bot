import { Badge } from "@/components/ui/Badge";
import type { DemoMajorResult } from "@/types/orientation-chat";

interface DemoMajorCardProps {
  major: DemoMajorResult;
  rank: number;
}

export function DemoMajorCard({ major, rank }: DemoMajorCardProps) {
  return (
    <article className="rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)] p-5 shadow-[var(--demo-shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--demo-muted)]">
            Rank {rank}
          </p>
          <h3 className="mt-1 text-xl font-black text-[var(--demo-text)]">{major.majorName}</h3>
        </div>
        <Badge tone={major.fitPercent >= 80 ? "success" : "accent"}>{major.fitPercent}% fit</Badge>
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--demo-muted)]">{major.explanation}</p>
      <p className="mt-3 text-sm font-semibold text-[var(--demo-text)]">{major.salaryOutlook}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {major.careerExamples.map((career) => (
          <Badge key={career} tone="neutral">
            {career}
          </Badge>
        ))}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--demo-muted)]">
        Confidence {major.confidence}%
      </p>
    </article>
  );
}
