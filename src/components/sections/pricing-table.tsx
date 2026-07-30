import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/lead-form";
import { pricingLegalNote, pricingTiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingTable() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "relative flex flex-col p-6",
              tier.highlighted && "border-primary shadow-md ring-1 ring-primary"
            )}
          >
            {tier.highlighted && (
              <Badge className="absolute -top-3 left-6">Recomendado</Badge>
            )}
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>

            <div className="mt-5">
              <span className="text-3xl font-bold tracking-tight">{tier.price}</span>
              {tier.priceNote && (
                <span className="ml-1 text-sm text-muted-foreground">{tier.priceNote}</span>
              )}
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <LeadForm
              type="comprador"
              title={`Solicitar demo — Plan ${tier.name}`}
              trigger={
                <Button
                  className="mt-8"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.ctaLabel}
                </Button>
              }
            />
          </Card>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {pricingLegalNote}
      </p>
    </div>
  );
}
