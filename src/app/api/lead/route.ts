import { NextResponse } from "next/server";
import { z } from "zod";

import { leadSchema, submitLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la solicitud inválido." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos.",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 }
    );
  }

  await submitLead(parsed.data);

  return NextResponse.json({ ok: true });
}
