"use client";

import type { StepProps } from "@/components/orientation/steps/types";

export function StepFeasibilityConstraints({ answers, updateAnswers }: StepProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Max annual tuition budget (USD)</span>
        <input
          type="number"
          value={answers.maxAnnualTuitionBudgetUsd}
          onChange={(event) =>
            updateAnswers({ maxAnnualTuitionBudgetUsd: Number(event.target.value) || 0 })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Max monthly living budget (USD)</span>
        <input
          type="number"
          value={answers.maxMonthlyLivingBudgetUsd}
          onChange={(event) =>
            updateAnswers({ maxMonthlyLivingBudgetUsd: Number(event.target.value) || 0 })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Scholarship need</span>
        <select
          value={answers.scholarshipNeed}
          onChange={(event) =>
            updateAnswers({
              scholarshipNeed: event.target.value as "none" | "moderate" | "high",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="none">No scholarship needed</option>
          <option value="moderate">Moderate support needed</option>
          <option value="high">High support needed</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Visa preference</span>
        <select
          value={answers.visaPreference}
          onChange={(event) =>
            updateAnswers({
              visaPreference: event.target.value as "f1-focused" | "flexible",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="f1-focused">F-1 focused</option>
          <option value="flexible">Flexible</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Country flexibility</span>
        <select
          value={answers.countryFlexibility}
          onChange={(event) =>
            updateAnswers({
              countryFlexibility: event.target.value as
                | "usa-only"
                | "usa-priority"
                | "open",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="usa-only">USA only</option>
          <option value="usa-priority">USA priority</option>
          <option value="open">Open</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Bank statement capacity (USD)</span>
        <input
          type="number"
          value={answers.bankStatementCapacityUsd}
          onChange={(event) =>
            updateAnswers({ bankStatementCapacityUsd: Number(event.target.value) || 0 })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">English score</span>
        <input
          type="number"
          value={answers.englishScore}
          onChange={(event) =>
            updateAnswers({ englishScore: Number(event.target.value) || 0 })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Teamwork style</span>
        <select
          value={answers.teamworkStyle}
          onChange={(event) =>
            updateAnswers({
              teamworkStyle: event.target.value as "solo" | "balanced" | "team",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="solo">Solo</option>
          <option value="balanced">Balanced</option>
          <option value="team">Team</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Thinking style</span>
        <select
          value={answers.thinkingStyle}
          onChange={(event) =>
            updateAnswers({
              thinkingStyle: event.target.value as "creative" | "balanced" | "analytical",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm"
        >
          <option value="creative">Creative</option>
          <option value="balanced">Balanced</option>
          <option value="analytical">Analytical</option>
        </select>
      </label>
    </div>
  );
}
