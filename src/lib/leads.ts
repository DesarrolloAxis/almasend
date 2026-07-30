import "server-only";

import { pool } from "@/lib/db";
import type { Lead, LeadInput } from "@/lib/lead-schema";

function yesNoToBool(value: LeadInput["needsInvoicing"]): boolean | null {
  if (!value) return null;
  return value === "si";
}

/**
 * Single integration point for new leads captured on the site.
 * Persists to Postgres so the admin panel can list them.
 *
 * TODO(integration): also notify via Resend email and/or forward to a
 * CRM webhook once those destinations are decided, e.g.:
 *   await resend.emails.send({ ... })
 *   await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", body: JSON.stringify(lead) })
 */
export async function submitLead(lead: LeadInput): Promise<void> {
  await pool.query(
    `INSERT INTO leads (
       name, business_name, email, phone, message, type,
       business_rut, business_address, city, needs_invoicing, is_cencocal_client, plan
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      lead.name,
      lead.businessName,
      lead.email,
      lead.phone,
      lead.message || null,
      lead.type,
      lead.businessRut || null,
      lead.businessAddress || null,
      lead.city || null,
      yesNoToBool(lead.needsInvoicing),
      yesNoToBool(lead.isCencocalClient),
      lead.plan || null,
    ]
  );
}

export async function getLeads(): Promise<Lead[]> {
  const { rows } = await pool.query<Lead>(
    `SELECT id, name, business_name AS "businessName", email, phone, message, type,
            business_rut AS "businessRut", business_address AS "businessAddress", city,
            CASE needs_invoicing WHEN true THEN 'si' WHEN false THEN 'no' ELSE NULL END AS "needsInvoicing",
            CASE is_cencocal_client WHEN true THEN 'si' WHEN false THEN 'no' ELSE NULL END AS "isCencocalClient",
            plan,
            created_at AS "createdAt"
     FROM leads
     ORDER BY created_at DESC`
  );
  return rows;
}
