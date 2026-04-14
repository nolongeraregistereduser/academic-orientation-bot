"use client";

import type { StepProps } from "@/components/orientation/steps/types";

export function StepCareerIntent({ answers, updateAnswers }: StepProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Your five-year career vision</span>
        <textarea
          value={answers.fiveYearCareerVision}
          onChange={(event) => updateAnswers({ fiveYearCareerVision: event.target.value })}
          rows={4}
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Salary vs passion</span>
        <select
          value={answers.salaryVsPassion}
          onChange={(event) =>
            updateAnswers({
              salaryVsPassion: event.target.value as
                | "salary-first"
                | "balanced"
                | "passion-first",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="salary-first">Salary first</option>
          <option value="balanced">Balanced</option>
          <option value="passion-first">Passion first</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Corporate vs entrepreneurship</span>
        <select
          value={answers.corporateVsEntrepreneurship}
          onChange={(event) =>
            updateAnswers({
              corporateVsEntrepreneurship: event.target.value as
                | "corporate"
                | "balanced"
                | "entrepreneurship",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="corporate">Corporate</option>
          <option value="balanced">Balanced</option>
          <option value="entrepreneurship">Entrepreneurship</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Remote vs on-site</span>
        <select
          value={answers.remoteVsOnsite}
          onChange={(event) =>
            updateAnswers({
              remoteVsOnsite: event.target.value as "remote" | "hybrid" | "on-site",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Leadership vs specialist</span>
        <select
          value={answers.leadershipVsSpecialist}
          onChange={(event) =>
            updateAnswers({
              leadershipVsSpecialist: event.target.value as
                | "leadership"
                | "balanced"
                | "technical-specialist",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="leadership">Leadership</option>
          <option value="balanced">Balanced</option>
          <option value="technical-specialist">Technical specialist</option>
        </select>
      </label>
    </div>
  );
}
