import type { Metadata } from "next";
import {
  BarChart3,
  Boxes,
  CreditCard,
  FileCheck2,
  Headset,
  Network,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Funcionalidades",
  description:
    "Conoce todas las funcionalidades de Almasend: POS, control de inventario, DTE automático, reportes en tiempo real, crédito integrado, integración Cencocal y soporte experto.",
  alternates: { canonical: "/funcionalidades" },
  openGraph: {
    title: "Funcionalidades de Almasend",
    description:
      "POS, inventario, DTE automático, reportes, crédito integrado e integración Cencocal en una sola plataforma.",
    url: "/funcionalidades",
  },
};

const modules = [
  {
    icon: ShoppingCart,
    title: "POS Inteligente",
    description: "Punto de venta rápido y confiable, pensado para el ritmo de un almacén.",
    bullets: [
      "Venta con código de barras o búsqueda rápida",
      "Múltiples medios de pago",
      "Funciona con el hardware que ya tienes",
      "Interfaz simple para cualquier miembro del equipo",
    ],
  },
  {
    icon: Boxes,
    title: "Control de Inventario",
    description: "Visibilidad total de tu stock, sin sorpresas ni quiebres.",
    bullets: [
      "Stock en tiempo real por producto",
      "Alertas automáticas de stock bajo",
      "Pedidos sugeridos según historial de ventas",
      "Reporte de mermas y ajustes",
    ],
  },
  {
    icon: FileCheck2,
    title: "DTE Automático",
    description: "Facturación electrónica integrada con el SII desde el primer día.",
    bullets: [
      "Boletas y facturas electrónicas",
      "Notas de crédito y débito",
      "Sin sistemas externos ni doble digitación",
      "Cumplimiento normativo al día",
    ],
  },
  {
    icon: BarChart3,
    title: "Reportes en Tiempo Real",
    description: "Los datos que necesitas para tomar decisiones, no solo para mirar ventas.",
    bullets: [
      "Dashboard de ventas y tendencias",
      "Márgenes por producto",
      "Estado de cartera por cliente",
      "Reportes exportables",
    ],
  },
  {
    icon: CreditCard,
    title: "Crédito Integrado",
    description: "Administra el fiado de tus clientes sin planillas paralelas.",
    bullets: [
      "Líneas de crédito por cliente",
      "Límites automáticos",
      "Alertas de vencimiento",
      "Cobranza integrada al POS",
    ],
  },
  {
    icon: Network,
    title: "Integración Cencocal",
    description: "La única POS con conexión directa y nativa a Cencocal.",
    bullets: [
      "Pedidos directos sin duplicar datos",
      "Sincronización automática de inventario",
      "Precios actualizados en tiempo real",
      "0% comisión para clientes Cencocal",
    ],
  },
  {
    icon: Headset,
    title: "Soporte Experto",
    description: "Un equipo que conoce el retail tradicional y el DTE chileno.",
    bullets: [
      "Soporte por los canales que ya usas",
      "Onboarding y capacitación incluidos",
      "Equipo que entiende tu operación diaria",
    ],
  },
];

export default function FuncionalidadesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Funcionalidades</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Todo lo que necesita un almacén o minimarket, integrado en una sola plataforma.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {modules.map((mod) => (
              <Card key={mod.title} className="p-8">
                <mod.icon className="size-9 text-primary" />
                <h2 className="mt-4 text-xl font-semibold">{mod.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {mod.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading title="¿Quieres ver todo esto en acción?" />
          <div className="mt-8 flex justify-center">
            <LeadForm type="comprador" trigger={<Button size="lg">Solicitar Demo</Button>} />
          </div>
        </div>
      </section>
    </>
  );
}
