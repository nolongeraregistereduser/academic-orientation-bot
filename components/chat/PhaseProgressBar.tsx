import type { ConversationPhaseMeta, ConversationProgress } from "@/types/orientation-chat";

interface PhaseProgressBarProps {
  progress: ConversationProgress;
  currentPhaseMeta: ConversationPhaseMeta | null;
}

export function PhaseProgressBar({
  progress,
  currentPhaseMeta,
}: PhaseProgressBarProps) {
  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-4 shadow-[var(--demo-shadow-soft)]">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.11em] text-[var(--demo-muted)]">
        <span>
          Phase {progress.currentPhaseIndex + 1}/{progress.totalPhases}
        </span>
        <span>
          {progress.askedCount}/{progress.targetCount} asked
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--demo-surface)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--demo-accent)_0%,#72b8ff_45%,#2a63be_100%)] transition-all duration-500"
          style={{ width: `${Math.max(progress.percent, 4)}%` }}
        />
      </div>

      {currentPhaseMeta ? (
        <div className="mt-3">
          <p className="text-sm font-semibold text-[var(--demo-text)]">{currentPhaseMeta.title}</p>
          <p className="text-xs text-[var(--demo-muted)]">{currentPhaseMeta.subtitle}</p>
        </div>
      ) : null}
    </section>
  );
}
