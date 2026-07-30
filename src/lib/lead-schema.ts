import { z } from "zod";

export const leadTypes = ["comprador", "proveedor"] as const;
export type LeadType = (typeof leadTypes)[number];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre completo"),
  businessName: z.string().trim().min(2, "Ingresa el nombre del negocio"),
  email: z.string().trim().email("Ingresa un correo válido"),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresa un teléfono válido")
    .regex(/^[0-9+\s()-]+$/, "Ingresa un teléfono válido"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  type: z.enum(leadTypes),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type Lead = LeadInput & {
  id: number;
  createdAt: string;
};
