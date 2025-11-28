/**
 * Página del Editor de CV
 * 
 * Esta página permite editar un CV existente
 * Por ahora muestra una vista básica con el CV y la plantilla
 * 
 * Ruta: /editor/[id]
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { CVData } from "@/types/cv";
import Link from "next/link";

export const metadata = {
  title: "Editor de CV - CV Maker",
  description: "Edita tu currículum vitae",
};

interface EditorPageProps {
  params: { id: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Obtener el CV
  const cv = await prisma.cV.findUnique({
    where: { id: params.id },
  });

  // Verificar que el CV existe
  if (!cv) {
    notFound();
  }

  // Verificar que el CV pertenece al usuario
  if (cv.userId !== session.user.id) {
    redirect("/dashboard");
  }

  // Parsear los datos del CV
  let cvData: CVData;
  try {
    cvData = JSON.parse(cv.data);
  } catch (error) {
    console.error("Error al parsear datos del CV:", error);
    cvData = {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
      },
      experience: [],
      education: [],
      skills: [],
      summary: "",
      languages: [],
      certifications: [],
    };
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Editor: {cv.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Plantilla: {cv.template}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-sm"
              >
                ← Volver
              </Link>
              <Link
                href={`/preview?id=${cv.id}`}
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors text-sm"
              >
                Vista Previa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensaje temporal: Editor en construcción */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Editor en construcción:</strong> Por ahora puedes ver la vista previa de tu CV. 
                El editor completo con formularios de edición estará disponible próximamente.
              </p>
            </div>
          </div>
        </div>

        {/* Vista del CV con la plantilla */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <TemplateRenderer templateName={cv.template} data={cvData} />
        </div>
      </main>
    </div>
  );
}

