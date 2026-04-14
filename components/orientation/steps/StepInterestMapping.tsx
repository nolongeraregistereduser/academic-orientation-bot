"use client";

import {
  parseCommaValues,
  stringifyCommaValues,
  type StepProps,
} from "@/components/orientation/steps/types";

const domainOptions: Array<
  | "business"
  | "technology"
  | "health"
  | "creativity"
  | "law"
  | "engineering"
  | "social-sciences"
> = [
  "business",
  "technology",
  "health",
  "creativity",
  "law",
  "engineering",
  "social-sciences",
];

export function StepInterestMapping({ answers, updateAnswers }: StepProps) {
  const toggleDomain = (domain: (typeof domainOptions)[number]) => {
    const hasDomain = answers.preferredDomains.includes(domain);
    updateAnswers({
      preferredDomains: hasDomain
        ? answers.preferredDomains.filter((item) => item !== domain)
        : [...answers.preferredDomains, domain],
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-[var(--brand-ink)]">Preferred domains</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {domainOptions.map((domain) => {
            const selected = answers.preferredDomains.includes(domain);
            return (
              <button
                key={domain}
                type="button"
                onClick={() => toggleDomain(domain)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold capitalize transition ${
                  selected
                    ? "border-[var(--brand-ink)] bg-[var(--brand-accent)]/70 text-[var(--brand-ink)]"
                    : "border-black/15 bg-white text-black/70"
                }`}
              >
                {domain.replace("-", " ")}
              </button>
            );
          })}
        </div>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Curiosity topics</span>
        <input
          value={stringifyCommaValues(answers.curiosityTopics)}
          onChange={(event) =>
            updateAnswers({ curiosityTopics: parseCommaValues(event.target.value) })
          }
          placeholder="fintech, digital growth, consumer behavior"
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-[var(--brand-ink)]">Favorite problem types</span>
        <input
          value={stringifyCommaValues(answers.favoriteProblemTypes)}
          onChange={(event) =>
            updateAnswers({ favoriteProblemTypes: parseCommaValues(event.target.value) })
          }
          placeholder="optimization, strategy, forecasting"
          className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
        />
      </label>
    </div>
  );
}
