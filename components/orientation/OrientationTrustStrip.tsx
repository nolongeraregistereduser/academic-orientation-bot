import { demoCopy } from "@/data/demo-copy";

export function OrientationTrustStrip() {
  return (
    <section className="grid gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 md:grid-cols-3">
      {demoCopy.trustStrip.map((item) => (
        <div key={item} className="rounded-xl bg-black/[0.03] p-3 text-center text-xs font-semibold uppercase tracking-wide text-black/70">
          {item}
        </div>
      ))}
    </section>
  );
}
