import type { Metadata } from "next";
import {
  ClipboardCheck,
  Rocket,
  Settings2,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { CLIENT_LOGIN_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Así de simple es implementar Almasend en tu almacén o minimarket: solicita tu demo, configuramos tu catálogo, capacitamos a tu equipo y empiezas a vender con DTE automático desde el día 1.",
  alternates: { canonical: "/como-funciona" },
  openGraph: {
    title: "Cómo funciona Almasend",
    description:
      "Así de simple es implementar Almasend en tu almacén o minimarket, operativo en 24 horas.",
    url: "/como-funciona",
  },
};

const steps = [
  {
    icon: ClipboardCheck,
    title: "1. Solicita tu demo",
    description:
      "Completa el formulario y un especialista te contacta para entender el tamaño y las necesidades de tu negocio.",
  },
  {
    icon: Settings2,
    title: "2. Configuramos tu catálogo",
    description:
      "Cargamos tu inventario inicial, precios y, si aplica, dejamos lista la integración con Cencocal.",
  },
  {
    icon: Store,
    title: "3. Capacitamos a tu equipo",
    description:
      "Tu equipo aprende a usar el POS, emitir DTE y revisar reportes en una sesión práctica y corta.",
  },
  {
    icon: Rocket,
    title: "4. Empiezas a vender",
    description:
      "En 24 horas tu almacén queda operativo, con boletas electrónicas desde la primera venta.",
  },
];

const faqs = [
  {
    question: "¿Necesito comprar hardware especial?",
    answer:
      "Almasend funciona con el equipamiento que la mayoría de los almacenes ya tiene: computador o tablet, impresora térmica y lector de código de barras. Te orientamos según lo que tengas disponible.",
  },
  {
    question: "¿Qué pasa con mis boletas y facturas actuales?",
    answer:
      "El DTE queda integrado desde el primer día: boletas, facturas y notas de crédito se emiten directo desde el POS, sin sistemas externos.",
  },
  {
    question: "¿Puedo empezar sin comprometerme?",
    answer:
      "Sí. La prueba es gratuita por 30 días y no se requiere tarjeta de crédito para partir.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Cómo funciona</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            De la demo a tu primera venta con DTE, en 24 horas.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.title} className="p-6">
                <step.icon className="size-8 text-primary" />
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Preguntas frecuentes" />
          <div className="mt-10 flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Empezamos con tu demo?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LeadForm type="comprador" trigger={<Button size="lg">Solicitar Demo</Button>} />
            <Button size="lg" variant="outline" asChild>
              <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Acceso Clientes
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
