import type { UniversityProgramMatch } from "@/types/university";
import { Badge } from "@/components/ui/Badge";

interface ProgramFitBadgesProps {
  match: UniversityProgramMatch;
}

export function ProgramFitBadges({ match }: ProgramFitBadgesProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Badge tone={match.budgetFit === "within-budget" ? "success" : "warning"}>
        {match.budgetFit}
      </Badge>
      <Badge tone={match.eligibility === "eligible" ? "success" : "warning"}>
        {match.eligibility}
      </Badge>
      {match.stem ? <Badge tone="accent">STEM</Badge> : null}
      {match.scholarshipAvailable ? <Badge tone="neutral">Scholarship</Badge> : null}
    </div>
  );
}
