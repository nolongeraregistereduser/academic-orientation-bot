"use client";

import { parseCommaValues, stringifyCommaValues, type StepProps } from "@/components/orientation/steps/types";

export function StepAcademicStrength({ answers, updateAnswers }: StepProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Strongest subjects</span>
        <input
          value={stringifyCommaValues(answers.strongestSubjects)}
          onChange={(event) =>
            updateAnswers({ strongestSubjects: parseCommaValues(event.target.value) })
          }
          placeholder="math, statistics, economics"
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Disliked subjects</span>
        <input
          value={stringifyCommaValues(answers.dislikedSubjects)}
          onChange={(event) =>
            updateAnswers({ dislikedSubjects: parseCommaValues(event.target.value) })
          }
          placeholder="chemistry, literature"
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        />
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">
          Quantitative problem solving comfort ({answers.enjoysQuantitativeProblemSolving}/5)
        </span>
        <input
          type="range"
          min={1}
          max={5}
          value={answers.enjoysQuantitativeProblemSolving}
          onChange={(event) =>
            updateAnswers({
              enjoysQuantitativeProblemSolving: Number(event.target.value) as
                | 1
                | 2
                | 3
                | 4
                | 5,
            })
          }
          className="w-full"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Practical vs theory preference</span>
        <select
          value={answers.practicalVsTheoryPreference}
          onChange={(event) =>
            updateAnswers({
              practicalVsTheoryPreference: event.target.value as
                | "practical"
                | "balanced"
                | "theory",
            })
          }
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        >
          <option value="practical">Practical</option>
          <option value="balanced">Balanced</option>
          <option value="theory">Theory</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">
          Research comfort ({answers.researchComfortLevel}/5)
        </span>
        <input
          type="range"
          min={1}
          max={5}
          value={answers.researchComfortLevel}
          onChange={(event) =>
            updateAnswers({
              researchComfortLevel: Number(event.target.value) as 1 | 2 | 3 | 4 | 5,
            })
          }
          className="w-full"
        />
      </label>
    </div>
  );
}
