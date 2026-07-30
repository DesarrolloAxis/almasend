import type { Metadata } from "next";
import { BarChart3, ClipboardList, Network, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { SALES_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Vende a través de la red Almasend | Proveedores",
  description:
    "Vende tus productos directamente desde el POS Almasend a todos los almacenes y minimarkets conectados a la red. Sin inversión inicial salvo el setup.",
  alternates: { canonical: "/proveedores" },
  openGraph: {
    title: "Almasend Proveedores — vende a toda la red de almacenes conectados",
    description:
      "Vende tus productos directamente desde el POS Almasend a todos los almacenes y minimarkets conectados a la red.",
    url: "/proveedores",
  },
};

const valueProps = [
  {
    icon: Network,
    title: "Red nacional",
    description: "Llega a almacenes y minimarkets de todo Chile conectados a Almasend.",
  },
  {
    icon: Wallet,
    title: "Sin inversión inicial",
    description: "Solo el setup de integración, sin costos de desarrollo adicionales.",
  },
  {
    icon: BarChart3,
    title: "Visibilidad en tiempo real",
    description: "Dashboard de ventas, clientes y demanda de tus productos en la red.",
  },
  {
    icon: ClipboardList,
    title: "Gestión de pedidos automatizada",
    description: "Los pedidos de los almacenes llegan directo a tu sistema, sin planillas.",
  },
];

export default function ProveedoresPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Para proveedores
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Vende tus productos directamente desde nuestro POS a todos los almacenes conectados
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Almasend conecta tu catálogo con la red de almacenes y minimarkets que ya usan
            nuestro sistema, sin duplicar procesos ni planillas.
          </p>
          <div className="mt-8 flex justify-center">
            <LeadForm
              type="proveedor"
              title="Solicitar integración como proveedor"
              description="Cuéntanos sobre tu empresa y qué productos quieres distribuir."
              trigger={<Button size="lg">Solicitar integración</Button>}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Respuesta en 24 horas · contacto {SALES_EMAIL}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Por qué vender a través de Almasend" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {valueProps.map((v) => (
              <Card key={v.title} className="p-6">
                <v.icon className="size-8 text-primary" />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Condiciones comerciales" align="left" />

          <Card className="mt-8 p-8">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Setup inicial (pago único)</dt>
                <dd className="mt-1 text-2xl font-bold">62 UF + IVA</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Comisión mensual</dt>
                <dd className="mt-1 text-2xl font-bold">3,5% + IVA</dd>
                <dd className="text-xs text-muted-foreground">sobre ventas netas</dd>
              </div>
            </dl>

            <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5">
              <p className="text-sm font-semibold">Ejemplo de cálculo</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Venta $100.000 neto → Comisión $3.500 (3,5%) + IVA
              </p>
            </div>
          </Card>

          <div className="mt-10 flex justify-center">
            <LeadForm
              type="proveedor"
              title="Solicitar integración como proveedor"
              description="Cuéntanos sobre tu empresa y qué productos quieres distribuir."
              trigger={<Button size="lg">Solicitar integración</Button>}
            />
          </div>
        </div>
      </section>
    </>
  );
}
