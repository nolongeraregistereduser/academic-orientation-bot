import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-black/10 bg-white/90 shadow-[0_16px_36px_rgba(8,12,24,0.08)] backdrop-blur ${className}`}
      {...props}
    />
  );
}
