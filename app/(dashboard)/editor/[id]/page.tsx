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
import { CVData } from "@/types/cv";
import EditorLayout from "@/components/editor/EditorLayout";

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
    <EditorLayout
      initialData={cvData}
      templateName={cv.template}
      cvId={cv.id}
      cvTitle={cv.title}
    />
  );
}

