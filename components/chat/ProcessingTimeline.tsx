import { motion } from "framer-motion";
import type { ProcessingStage } from "@/types/orientation-chat";

interface ProcessingTimelineProps {
  stages: ProcessingStage[];
  activeIndex: number;
}

export function ProcessingTimeline({
  stages,
  activeIndex,
}: ProcessingTimelineProps) {
  const progressPercent = Math.round(((activeIndex + 1) / stages.length) * 100);

  return (
    <section className="rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-5 shadow-[var(--demo-shadow-soft)]">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[var(--demo-muted)]">
        <span>AI Advisor Processing</span>
        <span>{Math.max(progressPercent, 0)}%</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--demo-surface)]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--demo-accent)_0%,#72b8ff_45%,#2a63be_100%)]"
          animate={{ width: `${Math.max(progressPercent, 4)}%` }}
          transition={{ duration: 0.48, ease: "easeOut" }}
        />
      </div>

      <div className="mt-4 space-y-2">
        {stages.map((stage, index) => {
          const isActive = index <= activeIndex;
          return (
            <div key={stage.id} className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  isActive ? "bg-[var(--demo-accent)]" : "bg-[var(--demo-border)]"
                }`}
              />
              <p
                className={`text-sm ${
                  isActive ? "text-[var(--demo-text)]" : "text-[var(--demo-muted)]"
                }`}
              >
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
