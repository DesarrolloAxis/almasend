import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almasend.app"),
  title: {
    default: "Almasend — El sistema POS integral para el canal tradicional",
    template: "%s | Almasend",
  },
  description:
    "Almasend es el sistema POS para almacenes y minimarkets chilenos: ventas, inventario y DTE en una sola plataforma. Prueba gratis 30 días, sin tarjeta de crédito.",
  openGraph: {
    siteName: "Almasend",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
