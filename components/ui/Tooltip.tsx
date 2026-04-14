import type { HTMLAttributes } from "react";

interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export function Tooltip({ label, className = "", children, ...props }: TooltipProps) {
  return (
    <span title={label} className={`cursor-help ${className}`} {...props}>
      {children}
    </span>
  );
}
