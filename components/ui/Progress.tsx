interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-black/10 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-[var(--brand-accent)] via-[#72c5ff] to-[var(--brand-ink)] transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
