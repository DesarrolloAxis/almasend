import type { Metadata } from "next";
import {
  BarChart3,
  Boxes,
  CreditCard,
  FileCheck2,
  Headset,
  Network,
  Receipt,
  ShoppingCart,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { PosMock } from "@/components/pos-mock";
import { SectionHeading } from "@/components/section-heading";
import { PricingTable } from "@/components/sections/pricing-table";
import { Testimonials } from "@/components/sections/testimonials";
import { CLIENT_LOGIN_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "El sistema POS integral para el canal tradicional",
  description:
    "Gestión de ventas, inventario y DTE en una sola plataforma. Prueba gratuita de 30 días, sin tarjeta de crédito. El POS diseñado para almacenes y minimarkets chilenos.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Almasend — El sistema POS integral para el canal tradicional",
    description:
      "Gestión de ventas, inventario y DTE en una sola plataforma. Prueba gratuita de 30 días, sin tarjeta de crédito.",
    url: "/",
  },
};

const features = [
  {
    icon: ShoppingCart,
    title: "POS Inteligente",
    description:
      "Sistema de punto de venta rápido, confiable, diseñado para almacenes chilenos.",
  },
  {
    icon: Boxes,
    title: "Control de Inventario",
    description:
      "Visibilidad en tiempo real de stock, alertas automáticas y reporte por producto.",
  },
  {
    icon: FileCheck2,
    title: "DTE Automático",
    description:
      "Facturación electrónica integrada con SII, boletas y notas de crédito incluidas.",
  },
  {
    icon: BarChart3,
    title: "Reportes en Tiempo Real",
    description: "Dashboards de ventas, márgenes, cartera y tendencias.",
  },
  {
    icon: CreditCard,
    title: "Crédito Integrado",
    description:
      "Líneas de crédito para clientes, alertas de vencimiento y cobranza automatizada.",
  },
  {
    icon: Headset,
    title: "Soporte Experto",
    description:
      "Equipo que entiende retail, DTE chileno y los desafíos de los almacenes.",
  },
];

const differentiators = [
  {
    icon: Sparkles,
    title: "Pedidos Sugeridos Inteligentes",
    description:
      "Sugiere cuánto pedir a cualquier proveedor configurado según historial de ventas y stock actual.",
  },
  {
    icon: Network,
    title: "Integración Cencocal Nativa",
    description:
      "Única POS con conexión directa a Cencocal: ordena sin duplicar datos.",
  },
  {
    icon: Receipt,
    title: "DTE Automático desde cero",
    description: "No es un add-on: la facturación electrónica está integrada de fábrica.",
  },
  {
    icon: BarChart3,
    title: "Reportes para vender más",
    description: "Márgenes por producto y cartera por cliente, no solo totales de venta.",
  },
  {
    icon: CreditCard,
    title: "Crédito con control automático",
    description: "Límites automáticos por cliente y cobranza integrada al día a día.",
  },
  {
    icon: ThumbsUp,
    title: "Soporte que entiende retail",
    description: "No son consultores genéricos: conocen almacenes, DTE chileno y su operación.",
  },
];

const metrics = [
  { value: "+25.000", label: "clientes potenciales en Cencocal" },
  { value: "24h", label: "para estar operativo" },
  { value: "0%", label: "comisión para clientes Cencocal" },
];

const cencocalPoints = [
  "Ordena productos directamente desde Almasend",
  "0% comisión para clientes Cencocal",
  "Sincronización automática de inventario",
  "Precios actualizados en tiempo real",
  "Acceso a +25.000 clientes en la red Cencocal",
  "Soporte especializado en Cencocal",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              El sistema POS integral para el canal tradicional
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Gestión de ventas, inventario y DTE en una sola plataforma.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LeadForm type="comprador" trigger={<Button size="lg">Solicitar Demo</Button>} />
              <Button size="lg" variant="outline" asChild>
                <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Acceso Clientes
                </a>
              </Button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              Prueba gratuita de 30 días, sin tarjeta de crédito.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-2xl font-bold text-primary sm:text-3xl">{m.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{m.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center md:justify-end">
            <PosMock />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Características principales"
            title="Todo lo que tu almacén necesita, en un solo sistema"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="p-6">
                <f.icon className="size-8 text-primary" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Diferenciadores" title="¿Qué nos diferencia?" />

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.title} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <d.icon className="size-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Planes y precios"
            title="Un plan para cada tamaño de negocio"
            description="Sin letra chica, sin sorpresas. Cambia de plan cuando lo necesites."
          />
          <div className="mt-12">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* Cencocal */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Integración Cencocal
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Pide directo a CENCOCAL y nunca dejes de vender
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {cencocalPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              C
            </div>
            <p className="text-4xl font-bold text-primary">+25.000</p>
            <p className="text-sm text-muted-foreground">
              clientes en la red Cencocal a los que puedes llegar sin duplicar datos
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonios" title="Almacenes que ya confían en Almasend" />
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para transformar tu almacén?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LeadForm
              type="comprador"
              trigger={<Button size="lg">Solicitar Demo Ahora</Button>}
            />
            <Button size="lg" variant="outline" asChild>
              <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Ir a Acceso Clientes
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
