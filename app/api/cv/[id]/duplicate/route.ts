/**
 * API Route para duplicar un CV
 * 
 * Esta ruta maneja:
 * - POST /api/cv/[id]/duplicate - Duplicar un CV existente
 * 
 * El [id] es un parámetro dinámico que viene en la URL
 * Ejemplo: POST /api/cv/abc123/duplicate → id = "abc123"
 * 
 * ¿Qué hace?
 * 1. Obtiene el CV original
 * 2. Verifica que pertenece al usuario
 * 3. Crea una copia con nuevo título y slug
 * 4. Mantiene todos los datos del CV original
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateSlug, generateUniqueSlug } from "@/lib/cv-helpers";

export async function POST(
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

    // 2. Buscar el CV original en la base de datos
    const originalCV = await prisma.cV.findUnique({
      where: { id: params.id },
    });

    // Si el CV no existe, retornar error
    if (!originalCV) {
      return NextResponse.json(
        { error: "CV no encontrado" },
        { status: 404 }
      );
    }

    // 3. Verificar que el CV pertenece al usuario
    // Esto es MUY importante: no queremos que alguien duplique CVs de otros
    if (originalCV.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para duplicar este CV" },
        { status: 403 }
      );
    }

    // 4. Generar nuevo título para la copia
    // Añadimos "Copia de" al inicio del título original
    const newTitle = `Copia de ${originalCV.title}`;

    // 5. Generar un slug único para el nuevo CV
    // Primero obtenemos todos los slugs existentes del usuario
    const userCVs = await prisma.cV.findMany({
      where: { userId: session.user.id },
      select: { slug: true },
    });

    const existingSlugs = userCVs.map((cv) => cv.slug);
    const baseSlug = generateSlug(newTitle);
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    // 6. Crear el nuevo CV con los datos del original
    // Mantenemos todos los datos (data, template, etc.) pero con nuevo título y slug
    const duplicatedCV = await prisma.cV.create({
      data: {
        userId: session.user.id, // El mismo usuario
        title: newTitle, // Nuevo título con "Copia de"
        slug: uniqueSlug, // Nuevo slug único
        template: originalCV.template, // Misma plantilla
        data: originalCV.data, // Mismos datos del CV (experiencia, educación, etc.)
        isPublic: false, // Por defecto no es público (aunque el original lo fuera)
        publicSlug: null, // No tiene enlace público aún
      },
    });

    // 7. Retornar éxito con el CV duplicado
    return NextResponse.json(
      {
        success: true,
        cv: {
          id: duplicatedCV.id,
          title: duplicatedCV.title,
          slug: duplicatedCV.slug,
          template: duplicatedCV.template,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al duplicar CV:", error);
    return NextResponse.json(
      { error: "Error al duplicar el CV. Por favor, intenta de nuevo." },
      { status: 500 }
    );
  }
}



