import { cn } from "@/lib/utils";

const items = [
  { name: "Coca-Cola 1.5L", qty: 2, price: 1590 },
  { name: "Pan Hallulla 500g", qty: 1, price: 1200 },
  { name: "Aceite Chef 1L", qty: 1, price: 3390 },
  { name: "Detergente Omo 800g", qty: 1, price: 4990 },
];

const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

export function PosMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-3 text-primary-foreground">
        <span className="text-sm font-semibold">Almasend POS</span>
        <span className="text-xs opacity-80">Caja 1 · Turno abierto</span>
      </div>

      <div className="flex flex-col gap-2 px-5 py-4">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">x{item.qty}</p>
            </div>
            <span className="tabular-nums">
              ${(item.qty * item.price).toLocaleString("es-CL")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-secondary/60 px-5 py-4">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-lg font-bold tabular-nums">
          ${total.toLocaleString("es-CL")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pb-5">
        <div className="rounded-lg bg-secondary py-2 text-center text-xs font-medium">
          Boleta DTE
        </div>
        <div className="rounded-lg bg-primary py-2 text-center text-xs font-medium text-primary-foreground">
          Cobrar
        </div>
      </div>
    </div>
  );
}
