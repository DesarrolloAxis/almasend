import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/logo-mark";
import { LogoutButton } from "@/components/admin/logout-button";
import { getLeads } from "@/lib/leads";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const filters = [
  { value: undefined, label: "Todos" },
  { value: "comprador", label: "Compradores" },
  { value: "proveedor", label: "Proveedores" },
] as const;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const leads = await getLeads();
  const filtered = type ? leads.filter((lead) => lead.type === type) : leads;

  return (
    <div className="min-h-full bg-secondary/30">
      <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-3">
          <LogoMark className="h-7 w-auto" />
          <span className="text-sm font-semibold text-muted-foreground">
            Panel administrativo
          </span>
        </div>
        <LogoutButton />
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <span className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {filters.map((f) => (
            <Link
              key={f.label}
              href={f.value ? `/admin?type=${f.value}` : "/admin"}
              className={cn(
                "rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-colors",
                type === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Negocio</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleString("es-CL", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">{lead.businessName}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <a href={`mailto:${lead.email}`} className="hover:underline">
                        {lead.email}
                      </a>
                      <span className="text-muted-foreground">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={lead.type === "proveedor" ? "accent" : "secondary"}>
                      {lead.type === "proveedor" ? "Proveedor" : "Comprador"}
                    </Badge>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-muted-foreground">
                    {lead.message || "—"}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    Todavía no hay leads.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
