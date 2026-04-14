import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { StepProps } from "@/components/orientation/steps/types";

export function StepReview({ answers }: StepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-[var(--brand-ink)]">
          Academic Signals
        </h3>
        <p className="mt-2 text-sm text-black/70">Strongest subjects</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {answers.strongestSubjects.map((subject) => (
            <Badge key={subject} tone="accent">
              {subject}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-[var(--brand-ink)]">
          Career Intent
        </h3>
        <p className="mt-2 text-sm text-black/70">{answers.fiveYearCareerVision}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-[var(--brand-ink)]">
          Financial Envelope
        </h3>
        <p className="mt-2 text-sm text-black/70">
          Tuition budget: {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(answers.maxAnnualTuitionBudgetUsd)}
        </p>
        <p className="mt-1 text-sm text-black/70">
          Living budget: {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(answers.maxMonthlyLivingBudgetUsd)}/month
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-[var(--brand-ink)]">
          Final Check
        </h3>
        <p className="mt-2 text-sm text-black/70">
          Your profile is ready. Continue to generate your counselor-style orientation report.
        </p>
      </Card>
    </div>
  );
}
