export function InsightPulse() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)]/45" />
      <span className="absolute inline-flex h-20 w-20 animate-pulse rounded-full bg-[#9ad7ff]/55" />
      <span className="relative inline-flex h-10 w-10 rounded-full bg-[var(--brand-ink)]" />
    </div>
  );
}
