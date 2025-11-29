/**
 * Ruta de API para NextAuth.js
 * 
 * Esta ruta maneja todas las peticiones de autenticación:
 * - /api/auth/signin (iniciar sesión)
 * - /api/auth/signout (cerrar sesión)
 * - /api/auth/session (obtener sesión actual)
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

