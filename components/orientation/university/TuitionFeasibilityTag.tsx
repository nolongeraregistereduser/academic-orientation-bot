import type { UniversityProgramMatch } from "@/types/university";

interface TuitionFeasibilityTagProps {
  budgetFit: UniversityProgramMatch["budgetFit"];
}

const labelByFit: Record<UniversityProgramMatch["budgetFit"], string> = {
  "within-budget": "Budget-safe",
  stretch: "Stretch",
  "over-budget": "Over budget",
};

const classByFit: Record<UniversityProgramMatch["budgetFit"], string> = {
  "within-budget": "bg-emerald-100 text-emerald-800",
  stretch: "bg-amber-100 text-amber-800",
  "over-budget": "bg-rose-100 text-rose-800",
};

export function TuitionFeasibilityTag({ budgetFit }: TuitionFeasibilityTagProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classByFit[budgetFit]}`}>
      {labelByFit[budgetFit]}
    </span>
  );
}
