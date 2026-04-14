"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

interface DemoNextActionBarProps {
  href: string;
}

export function DemoNextActionBar({ href }: DemoNextActionBarProps) {
  return (
    <section className="sticky bottom-3 z-20 rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-4 shadow-[0_20px_36px_rgba(16,22,38,0.28)] backdrop-blur">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--demo-muted)]">
            Next Best Action
          </p>
          <h3 className="text-lg font-black text-[var(--demo-text)]">Explore Matching Universities</h3>
        </div>
        <Link
          href={href}
          onClick={() => {
            trackFunnelEvent("demo_explorer_cta_clicked", {
              destination: href,
            });
          }}
        >
          <Button variant="secondary" size="lg">
            Explore Matching Universities
          </Button>
        </Link>
      </div>
    </section>
  );
}
