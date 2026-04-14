import type { MajorRecommendation } from "@/types/scoring";

const labels: Array<{ key: keyof MajorRecommendation["breakdown"]; label: string }> = [
  { key: "academicFit", label: "Academic Fit" },
  { key: "interestFit", label: "Interest Fit" },
  { key: "careerFit", label: "Career Fit" },
  { key: "financialFeasibility", label: "Financial Feasibility" },
  { key: "personalityFit", label: "Work Style Fit" },
];

const maxPerDimension: Record<keyof MajorRecommendation["breakdown"], number> = {
  academicFit: 35,
  interestFit: 25,
  careerFit: 20,
  financialFeasibility: 10,
  personalityFit: 10,
};

interface ScoreBreakdownPanelProps {
  major: MajorRecommendation;
}

export function ScoreBreakdownPanel({ major }: ScoreBreakdownPanelProps) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6">
      <h2 className="text-lg font-black text-[var(--brand-ink)]">Why {major.majorName} ranks high</h2>
      <div className="mt-4 space-y-3">
        {labels.map((item) => {
          const value = major.breakdown[item.key];
          const widthPercent = Math.round((value / maxPerDimension[item.key]) * 100);
          return (
            <div key={item.key}>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-black/65">
                <span>{item.label}</span>
                <span>
                  {value}/{maxPerDimension[item.key]}
                </span>
              </div>
              <div className="h-2 rounded-full bg-black/10">
                <div
                  className="h-2 rounded-full bg-[var(--brand-ink)]"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
