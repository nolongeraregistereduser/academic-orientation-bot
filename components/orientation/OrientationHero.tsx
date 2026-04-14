"use client";

import Link from "next/link";
import { orientationRoutes } from "@/config/routing";
import { demoCopy } from "@/data/demo-copy";
import { Button } from "@/components/ui/Button";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export function OrientationHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(125deg,#fffbe6_0%,#f4f8ff_45%,#d6f0ff_100%)] p-8 md:p-12">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--brand-accent)]/40 blur-3xl" />
      <div className="absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-[#9ad7ff]/50 blur-3xl" />
      <div className="relative z-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
          {demoCopy.hero.eyebrow}
        </p>
        <h1 className="text-3xl font-black leading-tight text-[var(--brand-ink)] md:text-5xl">
          {demoCopy.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/70 md:text-base">
          {demoCopy.hero.subtitle}
        </p>
        <div className="mt-8">
          <Link href={orientationRoutes.wizard}>
            <Button
              size="lg"
              onClick={() => {
                trackFunnelEvent("orientation_started", {
                  entryPoint: "orientation_landing",
                });
              }}
            >
              {demoCopy.hero.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
