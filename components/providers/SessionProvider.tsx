"use client";

/**
 * Provider de sesión para NextAuth
 * 
 * Envuelve la aplicación para proporcionar acceso a la sesión
 */

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}




