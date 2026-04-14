import { motion } from "framer-motion";

interface TypingIndicatorProps {
  label?: string;
}

export function TypingIndicator({
  label = "Vantery AI is thinking...",
}: TypingIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-card)] px-4 py-3 text-xs text-[var(--demo-muted)] shadow-[var(--demo-shadow-soft)]">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-[var(--demo-accent)]"
            animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 0.95,
              repeat: Number.POSITIVE_INFINITY,
              delay: dot * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span>{label}</span>
    </div>
  );
}
