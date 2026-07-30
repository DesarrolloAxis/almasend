"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/logo-mark";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setStatus("error");
      setError("No se pudo conectar. Intenta nuevamente.");
    }
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-secondary/40 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex justify-center">
          <LogoMark className="h-10 w-auto" />
        </div>
        <h1 className="mt-6 text-center text-lg font-semibold">Panel administrativo</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Ingresa la contraseña para ver los leads.
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {status === "error" && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={status === "submitting"} className="mt-2">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}
