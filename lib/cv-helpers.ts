/**
 * Funciones helper para CVs
 * 
 * Estas son funciones auxiliares que nos ayudan a trabajar con CVs
 * Son como "herramientas" que usaremos en diferentes partes del código
 */

import { CVData } from "@/types/cv";

/**
 * Genera datos vacíos para un CV nuevo
 * 
 * Cuando alguien crea un CV, empieza con todos los campos vacíos
 * Esta función crea esa estructura vacía
 */
export function getEmptyCVData(): CVData {
  return {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    experience: [],
    education: [],
    skills: [],
    summary: "",
    languages: [],
    certifications: [],
  };
}

/**
 * Genera un slug único desde un título
 * 
 * Un "slug" es una versión del título que se puede usar en URLs
 * Ejemplo: "Mi CV Frontend" → "mi-cv-frontend"
 * 
 * @param title - El título del CV
 * @returns Un slug limpio y válido para URLs
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase() // Convierte a minúsculas: "Mi CV" → "mi cv"
    .trim() // Elimina espacios al inicio y final
    .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales (solo letras, números, espacios y guiones)
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones: "mi cv" → "mi-cv"
    .replace(/-+/g, "-") // Elimina guiones duplicados: "mi--cv" → "mi-cv"
    .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio y final
}

/**
 * Genera un slug único verificando que no exista ya
 * 
 * Si el slug ya existe, añade un número al final
 * Ejemplo: "mi-cv" ya existe → "mi-cv-2"
 * 
 * @param baseSlug - El slug base generado desde el título
 * @param existingSlugs - Array de slugs que ya existen
 * @returns Un slug único que no existe en la lista
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  // Mientras el slug exista, añade un número
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

