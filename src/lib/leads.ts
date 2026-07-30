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

/**
 * Single integration point for new leads captured on the site.
 *
 * TODO: connect this to the real destination once it's decided —
 * e.g. send a notification email via Resend, and/or POST the lead
 * to the CRM webhook. For now it just logs so the form flow can be
 * verified end to end.
 */
export async function submitLead(lead: LeadInput): Promise<void> {
  // TODO(integration): replace with Resend email + CRM webhook call.
  // Example shape once ready:
  //   await resend.emails.send({ ... })
  //   await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", body: JSON.stringify(lead) })
  console.log("[lead:new]", lead);
}
