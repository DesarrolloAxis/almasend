import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const password = typeof body === "object" && body && "password" in body ? body.password : null;

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ ok: false, error: "Ingresa la contraseña." }, { status: 400 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
