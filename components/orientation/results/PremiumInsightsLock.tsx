import { demoFlags } from "@/config/demo-flags";

export function PremiumInsightsLock() {
  if (!demoFlags.enablePremiumLockTeaser) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-dashed border-black/25 bg-white/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-black/60">Premium Layer</p>
      <h3 className="mt-1 text-lg font-black text-[var(--brand-ink)]">
        Unlock scholarship strategy and visa documentation checklist
      </h3>
      <p className="mt-2 text-sm text-black/70">
        In production, this section becomes the monetization bridge into advanced advising and
        counselor escalation.
      </p>
    </section>
  );
}
