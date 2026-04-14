import { Progress } from "@/components/ui/Progress";

interface WizardProgressBarProps {
  progressPercent: number;
  currentStepLabel: string;
}

export function WizardProgressBar({
  progressPercent,
  currentStepLabel,
}: WizardProgressBarProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-black/60">
        <span>{currentStepLabel}</span>
        <span>{progressPercent}%</span>
      </div>
      <Progress value={progressPercent} />
    </div>
  );
}
