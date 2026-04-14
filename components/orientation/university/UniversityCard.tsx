import type { UniversityProgramMatch } from "@/types/university";
import { Card } from "@/components/ui/Card";
import { ProgramFitBadges } from "@/components/orientation/university/ProgramFitBadges";
import { TuitionFeasibilityTag } from "@/components/orientation/university/TuitionFeasibilityTag";

interface UniversityCardProps {
  match: UniversityProgramMatch;
}

export function UniversityCard({ match }: UniversityCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-[var(--brand-ink)]">{match.universityName}</h3>
          <p className="text-xs text-black/60">{match.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/55">Fit score</p>
          <p className="text-lg font-black text-[var(--brand-ink)]">{match.fitScore}</p>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-black/80">{match.programName}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-black/65">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(match.yearlyTotalCostUsd)}
          /year
        </p>
        <TuitionFeasibilityTag budgetFit={match.budgetFit} />
      </div>

      <ProgramFitBadges match={match} />
    </Card>
  );
}
