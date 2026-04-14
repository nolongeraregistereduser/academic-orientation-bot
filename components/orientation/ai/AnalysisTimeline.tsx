import { Progress } from "@/components/ui/Progress";

interface AnalysisTimelineProps {
  stages: string[];
  activeIndex: number;
  progressPercent: number;
}

export function AnalysisTimeline({
  stages,
  activeIndex,
  progressPercent,
}: AnalysisTimelineProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-black/10 bg-white/90 p-6">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-black/60">
        <span>AI Orientation Processing</span>
        <span>{progressPercent}%</span>
      </div>
      <Progress value={progressPercent} />
      <div className="space-y-3">
        {stages.map((stage, index) => {
          const isCompleted = index <= activeIndex;
          return (
            <div key={stage} className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  isCompleted ? "bg-[var(--brand-ink)]" : "bg-black/20"
                }`}
              />
              <p
                className={`text-sm ${
                  isCompleted ? "text-[var(--brand-ink)]" : "text-black/45"
                }`}
              >
                {stage}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
