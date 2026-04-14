import type { MajorRecommendation } from "@/types/scoring";
import { Badge } from "@/components/ui/Badge";

interface ExplanationPanelProps {
  major: MajorRecommendation;
}

export function ExplanationPanel({ major }: ExplanationPanelProps) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6">
      <h2 className="text-lg font-black text-[var(--brand-ink)]">Counselor-Style Explanation</h2>
      <p className="mt-3 text-sm leading-7 text-black/70">{major.advisorNarrative}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {major.explainability.strongestSignals.map((signal) => (
          <Badge key={signal} tone="success">
            {signal}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-sm font-semibold text-black/75">{major.tuitionFeasibilityInsight}</p>
    </section>
  );
}
