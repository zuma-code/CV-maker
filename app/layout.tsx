import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Maker - Creador de Currículums Profesionales",
  description: "Crea tu currículum vitae profesional con múltiples plantillas y diseños",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

