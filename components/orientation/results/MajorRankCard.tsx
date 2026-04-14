import type { MajorRecommendation } from "@/types/scoring";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface MajorRankCardProps {
  major: MajorRecommendation;
  rank: number;
}

export function MajorRankCard({ major, rank }: MajorRankCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-black/55">Rank {rank}</p>
          <h3 className="text-xl font-black text-[var(--brand-ink)]">{major.majorName}</h3>
        </div>
        <Badge tone={major.totalScore >= 80 ? "success" : "accent"}>{major.totalScore}/100</Badge>
      </div>
      <p className="mt-3 text-sm text-black/70">{major.careerOutlook}</p>
      <p className="mt-3 text-xs text-black/60">Confidence: {major.confidence}%</p>
    </Card>
  );
}
