/**
 * API Route para gestionar un CV individual
 * 
 * Esta ruta maneja:
 * - GET /api/cv/[id] - Obtener un CV (lo usaremos más adelante)
 * - DELETE /api/cv/[id] - Eliminar un CV
 * 
 * El [id] es un parámetro dinámico que viene en la URL
 * Ejemplo: DELETE /api/cv/abc123 → id = "abc123"
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * GET - Obtener un CV por ID
 * (Lo implementaremos más adelante cuando creemos el editor)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const cv = await prisma.cV.findUnique({
      where: { id: params.id },
    });

    if (!cv) {
      return NextResponse.json(
        { error: "CV no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que el CV pertenece al usuario
    if (cv.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para ver este CV" },
        { status: 403 }
      );
    }

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("Error al obtener CV:", error);
    return NextResponse.json(
      { error: "Error al obtener el CV" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Eliminar un CV
 * 
 * Pasos:
 * 1. Verificar que el usuario esté logueado
 * 2. Buscar el CV en la base de datos
 * 3. Verificar que el CV pertenece al usuario
 * 4. Eliminar el CV
 * 5. Retornar éxito
 */
export async function DELETE(
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
    // Esto es MUY importante: no queremos que alguien elimine CVs de otros
    if (cv.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar este CV" },
        { status: 403 }
      );
    }

    // 4. Eliminar el CV de la base de datos
    await prisma.cV.delete({
      where: { id: params.id },
    });

    // 5. Retornar éxito
    return NextResponse.json(
      { success: true, message: "CV eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar CV:", error);
    return NextResponse.json(
      { error: "Error al eliminar el CV. Por favor, intenta de nuevo." },
      { status: 500 }
    );
  }
}

