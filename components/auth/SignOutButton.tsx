"use client";

/**
 * Botón de cierre de sesión
 * 
 * Usa la función signOut de next-auth/react para cerrar sesión correctamente
 * con protección CSRF incluida
 */

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/login",
      redirect: true 
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-blue-600 hover:text-blue-700"
    >
      Cerrar Sesión
    </button>
  );
}








