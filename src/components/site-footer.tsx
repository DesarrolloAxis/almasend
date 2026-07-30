import Link from "next/link";

import { LogoMark } from "@/components/logo-mark";
import { CLIENT_LOGIN_URL, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants";

const footerLinks = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/funcionalidades", label: "Funcionalidades" },
  { href: "/precios", label: "Precios" },
  { href: "/proveedores", label: "Soporte" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <LogoMark className="h-8 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            El sistema POS integral para el canal tradicional: ventas, inventario y DTE en una
            sola plataforma.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Navegación</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CLIENT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Ingresar
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contacto</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>{SUPPORT_PHONE}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Almasend. Todos los derechos reservados.
      </div>
    </footer>
  );
}
