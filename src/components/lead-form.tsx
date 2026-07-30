"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { leadSchema, type LeadInput, type LeadType } from "@/lib/leads";

type LeadFormProps = {
  type: LeadType;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
};

export function LeadForm({
  type,
  trigger,
  title = "Solicitar demo",
  description = "Cuéntanos sobre tu negocio y te contactamos a la brevedad.",
}: LeadFormProps) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      message: "",
      type,
    },
  });

  async function onSubmit(values: LeadInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("success");
      reset({ ...values, name: "", businessName: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setStatus("idle");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-medium">¡Listo! Recibimos tu solicitud.</p>
            <p className="text-sm text-muted-foreground">
              Nuestro equipo te va a contactar dentro de las próximas 24 horas.
            </p>
            <Button variant="outline" className="mt-2" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Juan Pérez" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="businessName">
                {type === "proveedor" ? "Nombre de la empresa" : "Nombre del almacén o negocio"}
              </Label>
              <Input
                id="businessName"
                placeholder={type === "proveedor" ? "Distribuidora Ejemplo Ltda." : "Minimarket Don José"}
                {...register("businessName")}
              />
              {errors.businessName && (
                <p className="text-xs text-destructive">{errors.businessName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" placeholder="tucorreo@ejemplo.cl" {...register("email")} />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+56 9 1234 5678" {...register("phone")} />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Cuéntanos más (opcional)</Label>
              <Textarea
                id="message"
                placeholder={
                  type === "proveedor"
                    ? "¿Qué productos te gustaría distribuir?"
                    : "¿Cuántos puntos de venta tienes?"
                }
                {...register("message")}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-destructive">
                Algo salió mal. Intenta nuevamente o escríbenos a{" "}
                {type === "proveedor" ? "ventas@almasend.app" : "soporte@almasend.app"}.
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2">
              {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
              {type === "proveedor" ? "Solicitar integración" : "Solicitar demo"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
