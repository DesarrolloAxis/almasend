"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { CLIENT_LOGIN_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/funcionalidades", label: "Funcionalidades" },
  { href: "/precios", label: "Precios" },
  { href: "/proveedores", label: "Proveedores" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            A
          </span>
          Almasend
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" asChild>
            <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Acceso Clientes
            </a>
          </Button>
          <LeadForm
            type="comprador"
            trigger={<Button size="sm">Solicitar Demo</Button>}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 px-3">
            <Button variant="outline" asChild>
              <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Acceso Clientes
              </a>
            </Button>
            <LeadForm
              type="comprador"
              trigger={<Button>Solicitar Demo</Button>}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
