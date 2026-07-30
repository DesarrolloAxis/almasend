import { z } from "zod";

export const leadTypes = ["comprador", "proveedor"] as const;
export type LeadType = (typeof leadTypes)[number];

export const yesNoOptions = ["si", "no"] as const;
export type YesNo = (typeof yesNoOptions)[number];

// Matches the plans on /precios — kept as slugs so labels can change independently.
export const planOptions = ["almacen", "minimarket", "supermercado"] as const;
export type PlanOption = (typeof planOptions)[number];

export const planLabels: Record<PlanOption, string> = {
  almacen: "Almacén",
  minimarket: "Minimarket",
  supermercado: "Supermercado",
};

// Fields required by almasend.cl to provision a new tenant, in addition to
// the basic contact info below — only required for the "comprador" flow.
export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Ingresa tu nombre completo"),
    businessName: z.string().trim().min(2, "Ingresa la razón social o nombre del negocio"),
    email: z.string().trim().email("Ingresa un correo válido"),
    phone: z
      .string()
      .trim()
      .min(8, "Ingresa un teléfono válido")
      .regex(/^[0-9+\s()-]+$/, "Ingresa un teléfono válido"),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
    type: z.enum(leadTypes),
    businessRut: z.string().trim().optional().or(z.literal("")),
    businessAddress: z.string().trim().optional().or(z.literal("")),
    city: z.string().trim().optional().or(z.literal("")),
    needsInvoicing: z.enum(yesNoOptions).optional(),
    isCencocalClient: z.enum(yesNoOptions).optional(),
    plan: z.enum(planOptions).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type !== "comprador") return;

    if (!data.businessRut) {
      ctx.addIssue({ code: "custom", path: ["businessRut"], message: "Ingresa el RUT de la empresa" });
    }
    if (!data.businessAddress) {
      ctx.addIssue({ code: "custom", path: ["businessAddress"], message: "Ingresa la dirección" });
    }
    if (!data.city) {
      ctx.addIssue({ code: "custom", path: ["city"], message: "Ingresa la ciudad" });
    }
    if (!data.needsInvoicing) {
      ctx.addIssue({ code: "custom", path: ["needsInvoicing"], message: "Selecciona una opción" });
    }
    if (!data.isCencocalClient) {
      ctx.addIssue({ code: "custom", path: ["isCencocalClient"], message: "Selecciona una opción" });
    }
    if (!data.plan) {
      ctx.addIssue({ code: "custom", path: ["plan"], message: "Selecciona un plan" });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

export type Lead = LeadInput & {
  id: number;
  createdAt: string;
};
