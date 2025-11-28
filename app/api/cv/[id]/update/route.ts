/**
 * API Route para actualizar un CV
 * 
 * Esta ruta maneja:
 * - PATCH /api/cv/[id]/update - Actualizar los datos de un CV
 * 
 * El [id] es un parámetro dinámico que viene en la URL
 * Ejemplo: PATCH /api/cv/abc123/update → id = "abc123"
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CVData } from "@/types/cv";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verificar que el usuario esté logueado
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado. Debes iniciar sesión." },
        { status: 401 }
      );
    }

    // 2. Buscar el CV en la base de datos
    const cv = await prisma.cV.findUnique({
      where: { id: params.id },
    });

    // Si el CV no existe, retornar error
    if (!cv) {
      return NextResponse.json(
        { error: "CV no encontrado" },
        { status: 404 }
      );
    }

    // 3. Verificar que el CV pertenece al usuario
    // Esto es MUY importante: no queremos que alguien actualice CVs de otros
    if (cv.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para actualizar este CV" },
        { status: 403 }
      );
    }

    // 4. Obtener los nuevos datos del cuerpo de la petición
    const body = await request.json();
    const { data, template } = body;

    // Preparar los datos para actualizar
    const updateData: {
      data?: string;
      template?: string;
      updatedAt: Date;
    } = {
      updatedAt: new Date(), // Actualizar la fecha de modificación
    };

    // Si se proporcionan datos, validarlos y añadirlos
    if (data) {
      // Validar que los datos tengan la estructura correcta
      if (typeof data !== "object") {
        return NextResponse.json(
          { error: "Los datos del CV deben ser un objeto válido" },
          { status: 400 }
        );
      }
      updateData.data = JSON.stringify(data);
    }

    // Si se proporciona una plantilla, actualizarla
    if (template) {
      const validTemplates = [
        "modern",
        "classic",
        "creative",
        "minimal",
        "professional",
      ];
      if (validTemplates.includes(template.toLowerCase())) {
        updateData.template = template.toLowerCase();
      }
    }

    // 5. Actualizar el CV en la base de datos
    const updatedCV = await prisma.cV.update({
      where: { id: params.id },
      data: updateData,
    });

    // 6. Retornar éxito con el CV actualizado
    return NextResponse.json(
      {
        success: true,
        cv: {
          id: updatedCV.id,
          title: updatedCV.title,
          updatedAt: updatedCV.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar CV:", error);
    return NextResponse.json(
      { error: "Error al actualizar el CV. Por favor, intenta de nuevo." },
      { status: 500 }
    );
  }
}

