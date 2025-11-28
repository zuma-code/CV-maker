/**
 * Página principal del Dashboard
 * 
 * Muestra la lista de CVs del usuario y permite crear nuevos CVs
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import DeleteCVButton from "@/components/dashboard/DeleteCVButton";
import DuplicateCVButton from "@/components/dashboard/DuplicateCVButton";

export const metadata = {
  title: "Dashboard - CV Maker",
  description: "Gestiona tus currículums vitae",
};

export default async function DashboardPage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return null; // El layout ya redirige si no hay sesión
    }

    // Obtener todos los CVs del usuario
    let cvs: Array<{
      id: string;
      title: string;
      slug: string;
      template: string;
      updatedAt: Date;
    }> = [];
    try {
      cvs = await prisma.cV.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error al obtener CVs:", error);
      // Si hay error, mostrar página vacía pero funcional
      cvs = [];
    }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">CV Maker</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session.user.email}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Mis CVs</h2>
          <Link
            href="/dashboard/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Crear Nuevo CV
          </Link>
        </div>

        {/* Lista de CVs */}
        {cvs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">No tienes CVs creados aún</p>
            <Link
              href="/dashboard/new"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear tu primer CV
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cv.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Plantilla: {cv.template}
                </p>
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <Link
                      href={`/editor/${cv.id}`}
                      className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/preview?id=${cv.id}`}
                      className="flex-1 text-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                    >
                      Vista Previa
                    </Link>
                    <DeleteCVButton cvId={cv.id} cvTitle={cv.title} />
                  </div>
                  <DuplicateCVButton cvId={cv.id} cvTitle={cv.title} />
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Actualizado: {new Date(cv.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
    );
  } catch (error) {
    console.error("Error en DashboardPage:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">Hubo un problema al cargar el dashboard.</p>
          <Link
            href="/login"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
}

