"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  leadSchema,
  planLabels,
  planOptions,
  type LeadInput,
  type LeadType,
} from "@/lib/lead-schema";

type LeadFormProps = {
  type: LeadType;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
};

const emptyValues: LeadInput = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  message: "",
  type: "comprador",
  businessRut: "",
  businessAddress: "",
  city: "",
  needsInvoicing: undefined,
  isCencocalClient: undefined,
  plan: undefined,
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
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { ...emptyValues, type },
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
      reset({ ...emptyValues, type });
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
              <Label htmlFor="businessName">
                {type === "proveedor" ? "Nombre de la empresa" : "Razón social"}
              </Label>
              <Input
                id="businessName"
                placeholder={type === "proveedor" ? "Distribuidora Ejemplo Ltda." : "Minimarket Don José SpA"}
                {...register("businessName")}
              />
              {errors.businessName && (
                <p className="text-xs text-destructive">{errors.businessName.message}</p>
              )}
            </div>

            {type === "comprador" && (
              <>
                <p className="-mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Datos de la empresa
                </p>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="businessRut">Rut empresa</Label>
                  <Input id="businessRut" placeholder="76.123.456-7" {...register("businessRut")} />
                  {errors.businessRut && (
                    <p className="text-xs text-destructive">{errors.businessRut.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="businessAddress">Dirección</Label>
                  <Input
                    id="businessAddress"
                    placeholder="Av. Siempre Viva 742"
                    {...register("businessAddress")}
                  />
                  {errors.businessAddress && (
                    <p className="text-xs text-destructive">{errors.businessAddress.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" placeholder="Santiago" {...register("city")} />
                  {errors.city && (
                    <p className="text-xs text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>¿Requiere facturador?</Label>
                    <Controller
                      control={control}
                      name="needsInvoicing"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="si">Sí</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.needsInvoicing && (
                      <p className="text-xs text-destructive">{errors.needsInvoicing.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>¿Es cliente de Cencocal?</Label>
                    <Controller
                      control={control}
                      name="isCencocalClient"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="si">Sí</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.isCencocalClient && (
                      <p className="text-xs text-destructive">{errors.isCencocalClient.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>¿Qué plan desea?</Label>
                  <Controller
                    control={control}
                    name="plan"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {planOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {planLabels[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.plan && (
                    <p className="text-xs text-destructive">{errors.plan.message}</p>
                  )}
                </div>
              </>
            )}

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
