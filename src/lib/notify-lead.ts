import "server-only";

import { Resend } from "resend";

import { SALES_EMAIL, SUPPORT_EMAIL } from "@/lib/constants";
import { planLabels, type LeadInput, type PlanOption } from "@/lib/lead-schema";

const FROM_ADDRESS = "Almasend <onboarding@resend.dev>";

function yesNoLabel(value?: "si" | "no") {
  if (!value) return "—";
  return value === "si" ? "Sí" : "No";
}

function buildEmail(lead: LeadInput) {
  const isComprador = lead.type === "comprador";
  const subject = `Nuevo lead (${isComprador ? "comprador" : "proveedor"}): ${lead.name} — ${lead.businessName}`;

  const rows: Array<[string, string]> = [
    ["Nombre", lead.name],
    ["Negocio / Razón social", lead.businessName],
    ["Correo", lead.email],
    ["Teléfono", lead.phone],
  ];

  if (isComprador) {
    rows.push(
      ["Rut empresa", lead.businessRut || "—"],
      ["Dirección", lead.businessAddress || "—"],
      ["Ciudad", lead.city || "—"],
      ["Plan", lead.plan ? planLabels[lead.plan as PlanOption] : "—"],
      ["¿Requiere facturador?", yesNoLabel(lead.needsInvoicing)],
      ["¿Es cliente Cencocal?", yesNoLabel(lead.isCencocalClient)]
    );
  }

  rows.push(["Mensaje", lead.message || "—"]);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #1c1c1e;">
      <h2 style="margin-bottom: 16px;">Nuevo lead — ${isComprador ? "Comprador" : "Proveedor"}</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#6b6b70; vertical-align:top;">${label}</td><td>${value}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top: 24px;">
        <a href="https://www.almasend.app/admin">Ver en el panel de leads</a>
      </p>
    </div>
  `;

  return { subject, text, html };
}

/**
 * Sends an internal notification email when a new lead comes in.
 * Best-effort: failures are logged but never block the lead submission,
 * since the lead is already persisted to the database by this point.
 */
export async function notifyNewLead(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[lead:notify] RESEND_API_KEY not set, skipping email notification.");
    return;
  }

  const to = lead.type === "proveedor" ? SALES_EMAIL : SUPPORT_EMAIL;
  const { subject, text, html } = buildEmail(lead);

  try {
    const resend = new Resend(apiKey);
    // The SDK resolves (rather than throws) on API-level failures, so the
    // error field has to be checked explicitly — a rejected promise here
    // only covers network-level failures.
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[lead:notify] Resend API returned an error:", error);
    }
  } catch (err) {
    console.error("[lead:notify] Failed to send email notification:", err);
  }
}
