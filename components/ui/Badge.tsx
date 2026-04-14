import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success" | "warning" | "accent";
}

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-black/6 text-black/70",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  accent: "bg-[var(--brand-accent)] text-black",
};

export function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClass[tone]} ${className}`}
      {...props}
    />
  );
}
