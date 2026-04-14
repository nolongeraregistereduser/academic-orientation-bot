import type { UniversityProgramMatch } from "@/types/university";
import { UniversityCard } from "@/components/orientation/university/UniversityCard";

interface UniversityMatchGridProps {
  matches: UniversityProgramMatch[];
}

export function UniversityMatchGrid({ matches }: UniversityMatchGridProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-[var(--brand-ink)]">Matched US Programs</h2>
        <p className="text-sm text-black/70">
          Ranked by major fit, budget feasibility, and admission readiness.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <UniversityCard key={match.programId} match={match} />
        ))}
      </div>
    </section>
  );
}
