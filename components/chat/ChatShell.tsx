import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/chat/ThemeToggle";

interface ChatShellProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  children: ReactNode;
  footer: ReactNode;
}

export function ChatShell({
  theme,
  onToggleTheme,
  children,
  footer,
}: ChatShellProps) {
  return (
    <main className={`demo-theme-${theme} min-h-[82vh]`}> 
      <section className="relative mx-auto flex h-[82vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-[var(--demo-border)] bg-[var(--demo-shell)] p-3 shadow-[var(--demo-shadow-strong)] md:p-4">
        <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[var(--demo-glow-1)] blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-[var(--demo-glow-2)] blur-3xl" />

        <header className="relative z-10 flex items-center justify-between rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--demo-muted)]">
              Vantery AI Advisor
            </p>
            <h1 className="text-base font-black text-[var(--demo-text)] md:text-lg">
              Premium Conversational Orientation
            </h1>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </header>

        <div className="relative z-10 mt-3 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">{children}</div>
        <div className="relative z-10 mt-3">{footer}</div>
      </section>
    </main>
  );
}
