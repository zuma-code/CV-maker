/**
 * Funciones helper para exportar CV a imágenes
 * 
 * Estas funciones convierten el CV HTML a diferentes formatos de imagen
 */

import * as htmlToImage from "html-to-image";

/**
 * Exporta el CV a PNG
 * 
 * @param elementId - El ID del elemento HTML que contiene el CV
 * @param filename - El nombre del archivo (sin extensión)
 */
export async function exportToPNG(elementId: string, filename: string = "cv"): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Elemento con ID "${elementId}" no encontrado`);
    }

    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // Mejor calidad
      backgroundColor: "#ffffff",
    });

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error al exportar a PNG:", error);
    throw error;
  }
}

/**
 * Exporta el CV a JPG
 * 
 * @param elementId - El ID del elemento HTML que contiene el CV
 * @param filename - El nombre del archivo (sin extensión)
 */
export async function exportToJPG(elementId: string, filename: string = "cv"): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Elemento con ID "${elementId}" no encontrado`);
    }

    const dataUrl = await htmlToImage.toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2, // Mejor calidad
      backgroundColor: "#ffffff",
    });

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.download = `${filename}.jpg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error al exportar a JPG:", error);
    throw error;
  }
}

/**
 * Exporta el CV a SVG
 * 
 * @param elementId - El ID del elemento HTML que contiene el CV
 * @param filename - El nombre del archivo (sin extensión)
 */
export async function exportToSVG(elementId: string, filename: string = "cv"): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Elemento con ID "${elementId}" no encontrado`);
    }

    const dataUrl = await htmlToImage.toSvg(element, {
      pixelRatio: 2,
    });

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.download = `${filename}.svg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error al exportar a SVG:", error);
    throw error;
  }
}

/**
 * Genera un nombre de archivo seguro desde el título del CV
 * 
 * @param title - El título del CV
 * @returns Un nombre de archivo seguro
 */
export function generateSafeFilename(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/-+/g, "-") // Elimina guiones duplicados
    .replace(/^-+|-+$/g, "") // Elimina guiones al inicio y final
    .substring(0, 50); // Limita la longitud
}







