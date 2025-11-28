/**
 * Página de Vista Previa del CV
 * 
 * Esta página muestra cómo se verá el CV con la plantilla seleccionada
 * 
 * Ruta: /preview o /preview?id=[cvId]
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { CVData } from "@/types/cv";

export const metadata = {
  title: "Vista Previa - CV Maker",
  description: "Vista previa de tu currículum vitae",
};

interface PreviewPageProps {
  searchParams: { id?: string };
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Obtener el CV específico si se proporciona un ID, sino el más reciente
  let cv;
  if (searchParams.id) {
    cv = await prisma.cV.findFirst({
      where: {
        id: searchParams.id,
        userId: session.user.id, // Asegurar que pertenece al usuario
      },
    });
  } else {
    // Si no hay ID, obtener el más reciente
    cv = await prisma.cV.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  if (!cv) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No tienes CVs creados
          </h1>
          <p className="text-gray-600 mb-6">
            Crea un CV primero para ver la vista previa
          </p>
          <a
            href="/dashboard/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear CV
          </a>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Vista Previa: {cv.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Plantilla: {cv.template}
            </p>
          </div>
          <a
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Volver al Dashboard
          </a>
        </div>

        {/* Vista previa del CV */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <TemplateRenderer templateName={cv.template} data={cvData} />
        </div>
      </div>
    </div>
  );
}

