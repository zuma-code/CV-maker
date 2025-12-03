/**
 * Página 404 para CV no encontrado
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          CV no encontrado
        </h2>
        <p className="text-gray-600 mb-6">
          El CV que buscas no existe o no tienes permiso para verlo.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}







