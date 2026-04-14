import Link from "next/link";
import { orientationRoutes } from "@/config/routing";
import { Button } from "@/components/ui/Button";

export function NextBestActionPanel() {
  return (
    <section className="rounded-3xl border border-black/10 bg-[var(--brand-ink)] p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next Best Action</p>
      <h3 className="mt-1 text-xl font-black">Move from orientation to real program exploration.</h3>
      <p className="mt-2 text-sm text-white/80">
        Use your top-fit major and budget to jump directly into a pre-filtered university explorer.
      </p>
      <div className="mt-4">
        <Link href={orientationRoutes.explorerRedirect}>
          <Button variant="secondary">Go To Explorer Redirect</Button>
        </Link>
      </div>
    </section>
  );
}
