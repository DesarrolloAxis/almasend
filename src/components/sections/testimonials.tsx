import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((t) => (
        <Card key={t.name} className="p-6">
          <p className="text-sm leading-relaxed text-foreground">“{t.quote}”</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              {t.initials}
            </span>
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
