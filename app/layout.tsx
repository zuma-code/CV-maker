import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

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
      <body className="antialiased">
        <SessionProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

