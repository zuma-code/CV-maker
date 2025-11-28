/**
 * API Route para crear un nuevo CV
 * 
 * Esta es como una "puerta" que recibe la información del CV
 * y lo guarda en la base de datos
 * 
 * Ruta: POST /api/cv/create
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getEmptyCVData, generateSlug, generateUniqueSlug } from "@/lib/cv-helpers";

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar que el usuario esté logueado
    // Esto es importante: solo usuarios autenticados pueden crear CVs
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado. Debes iniciar sesión." },
        { status: 401 }
      );
    }

    // 2. Obtener los datos que vienen del formulario
    const body = await request.json();
    const { title, template } = body;

    // 3. Validar que los datos necesarios estén presentes
    if (!title || !template) {
      return NextResponse.json(
        { error: "Título y plantilla son requeridos" },
        { status: 400 }
      );
    }

    // Validar que el título tenga al menos 3 caracteres
    if (title.trim().length < 3) {
      return NextResponse.json(
        { error: "El título debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }

    // Validar que la plantilla sea válida
    const validTemplates = ["modern", "classic", "creative", "minimal", "professional"];
    if (!validTemplates.includes(template)) {
      return NextResponse.json(
        { error: "Plantilla inválida" },
        { status: 400 }
      );
    }

    // 4. Generar un slug único para este CV
    // Primero obtenemos todos los slugs existentes del usuario
    const userCVs = await prisma.cV.findMany({
      where: { userId: session.user.id },
      select: { slug: true },
    });

    const existingSlugs = userCVs.map((cv) => cv.slug);
    const baseSlug = generateSlug(title);
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    // 5. Crear los datos vacíos del CV
    const emptyCVData = getEmptyCVData();

    // 6. Crear el CV en la base de datos
    const newCV = await prisma.cV.create({
      data: {
        userId: session.user.id, // El ID del usuario que lo crea
        title: title.trim(), // El título sin espacios extra
        slug: uniqueSlug, // El slug único
        template: template, // La plantilla elegida
        data: JSON.stringify(emptyCVData), // Los datos vacíos convertidos a texto JSON
        isPublic: false, // Por defecto no es público
        publicSlug: null, // No tiene enlace público aún
      },
    });

    // 7. Retornar éxito con el CV creado
    return NextResponse.json(
      {
        success: true,
        cv: {
          id: newCV.id,
          title: newCV.title,
          slug: newCV.slug,
          template: newCV.template,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear CV:", error);
    return NextResponse.json(
      { error: "Error al crear el CV. Por favor, intenta de nuevo." },
      { status: 500 }
    );
  }
}

