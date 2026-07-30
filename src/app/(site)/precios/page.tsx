import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";
import { PricingTable } from "@/components/sections/pricing-table";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes de Almasend para almacenes, minimarkets y supermercados. Desde $25.000 neto al mes. Prueba gratis 30 días, sin tarjeta de crédito.",
  alternates: { canonical: "/precios" },
  openGraph: {
    title: "Precios de Almasend",
    description:
      "Planes de Almasend para almacenes, minimarkets y supermercados. Prueba gratis 30 días.",
    url: "/precios",
  },
};

const faqs = [
  {
    question: "¿Los precios incluyen IVA?",
    answer: "No, todos los precios son netos. El IVA (19%) se agrega al momento de facturar.",
  },
  {
    question: "¿Qué pasa si supero mis DTEs incluidos?",
    answer: "Los DTEs adicionales tienen un costo de 0.4 UF por cada 1.000 documentos.",
  },
  {
    question: "¿Hay algún costo de instalación?",
    answer:
      "El setup del facturador Almasend tiene un pago único de 2 UF + IVA. No hay otros costos ocultos de implementación.",
  },
  {
    question: "¿Puedo probar antes de pagar?",
    answer: "Sí, todos los planes incluyen 30 días de prueba gratuita, sin tarjeta de crédito.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Planes y precios
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Un plan para cada tamaño de negocio, sin letra chica.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PricingTable />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Preguntas frecuentes sobre precios" />
          <div className="mt-10 flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            ¿Vendes productos y quieres distribuir a través de la red Almasend? Revisa las
            condiciones para{" "}
            <Link href="/proveedores" className="font-medium text-primary underline underline-offset-2">
              proveedores
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para empezar?
          </h2>
          <div className="mt-8 flex justify-center">
            <LeadForm type="comprador" trigger={<Button size="lg">Solicitar Demo</Button>} />
          </div>
        </div>
      </section>
    </>
  );
}
