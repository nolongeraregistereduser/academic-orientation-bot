import { demoCopy } from "@/data/demo-copy";
import { Card } from "@/components/ui/Card";

export function OrientationValueProps() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {demoCopy.valueProps.map((item) => (
        <Card key={item.title} className="p-5">
          <h3 className="text-lg font-bold text-[var(--brand-ink)]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-black/70">{item.body}</p>
        </Card>
      ))}
    </section>
  );
}
