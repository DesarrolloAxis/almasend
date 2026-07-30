import { User } from "lucide-react";

import { cn } from "@/lib/utils";

const products = [
  { name: "Aceite Oliva 500ml", stock: 12, price: 7490 },
  { name: "Detergente Omo 800g", stock: -6, price: 4990 },
  { name: "Coca-Cola 1.5L", stock: 24, price: 1590 },
  { name: "Pan Hallulla 500g", stock: -8, price: 1200 },
  { name: "Arroz Grado 1 1kg", stock: 31, price: 1290 },
  { name: "Leche Entera 1L", stock: -4, price: 1090 },
];

export function PosMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between bg-primary px-5 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-full bg-[conic-gradient(from_180deg,#e94fb3,#f5a623,#4fc3f7,#e94fb3)]" />
          <span className="text-sm font-semibold">Almasend POS</span>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
          <User className="size-4" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-2.5 text-xs text-muted-foreground">
        <span>Cliente</span>
        <span className="flex-1 rounded-md bg-secondary px-2.5 py-1 text-left">
          Selecciona una persona
        </span>
      </div>

      <div className="flex gap-2 px-5 pt-3 text-[11px] text-muted-foreground">
        <span className="rounded-md border border-border px-2 py-1">Categorías</span>
        <span className="rounded-md border border-border px-2 py-1">Marcas</span>
        <span className="flex-1 rounded-md border border-border px-2 py-1">Buscar…</span>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5 py-4">
        {products.map((p) => (
          <div
            key={p.name}
            className="relative rounded-lg border border-border p-2 text-[11px]"
          >
            <span
              className={cn(
                "absolute -top-1.5 -left-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white",
                p.stock < 0 ? "bg-destructive" : "bg-emerald-600"
              )}
            >
              {p.stock}
            </span>
            <p className="line-clamp-2 font-medium leading-tight">{p.name}</p>
            <span className="mt-2 inline-block rounded bg-emerald-600/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              ${p.price.toLocaleString("es-CL")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-secondary/60 px-5 py-3">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-lg font-bold tabular-nums">$12.760</span>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pb-3">
        <div className="rounded-lg bg-destructive py-2 text-center text-xs font-semibold text-white">
          Limpiar
        </div>
        <div className="rounded-lg bg-emerald-600 py-2 text-center text-xs font-semibold text-white">
          Procesar
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 px-5 pb-5 text-[9px] font-medium text-white">
        <div className="rounded-md bg-amber-500 py-1.5 text-center">Cierre caja</div>
        <div className="rounded-md bg-slate-500 py-1.5 text-center">Retiro</div>
        <div className="rounded-md bg-sky-600 py-1.5 text-center">Documentos</div>
        <div className="rounded-md bg-primary py-1.5 text-center">Pedidos</div>
      </div>
    </div>
  );
}
