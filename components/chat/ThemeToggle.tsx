interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--demo-border)] bg-[var(--demo-card)] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--demo-text)] shadow-[var(--demo-shadow-soft)] transition hover:-translate-y-0.5"
      aria-label="Toggle light and dark mode"
    >
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
      <span className="text-[10px] text-[var(--demo-muted)]">Theme</span>
    </button>
  );
}
