/**
 * Funciones helper para plantillas
 * 
 * Funciones auxiliares que nos ayudan a trabajar con plantillas
 */

import { CVData } from "@/types/cv";

/**
 * Valida que un nombre de plantilla sea válido
 * 
 * @param templateName - El nombre de la plantilla a validar
 * @returns true si es válido, false si no
 */
export function isValidTemplate(templateName: string): boolean {
  const validTemplates = [
    "modern",
    "classic",
    "creative",
    "minimal",
    "professional",
  ];
  return validTemplates.includes(templateName.toLowerCase());
}

/**
 * Normaliza el nombre de la plantilla (convierte a minúsculas)
 * 
 * @param templateName - El nombre de la plantilla
 * @returns El nombre normalizado o "modern" como fallback
 */
export function normalizeTemplateName(templateName: string): string {
  const normalized = templateName.toLowerCase();
  return isValidTemplate(normalized) ? normalized : "modern";
}

/**
 * Obtiene el nombre legible de una plantilla
 * 
 * @param templateName - El nombre técnico de la plantilla
 * @returns El nombre legible para mostrar al usuario
 */
export function getTemplateDisplayName(templateName: string): string {
  const displayNames: Record<string, string> = {
    modern: "Moderno",
    classic: "Clásico",
    creative: "Creativo",
    minimal: "Minimalista",
    professional: "Profesional",
  };

  const normalized = normalizeTemplateName(templateName);
  return displayNames[normalized] || "Moderno";
}

/**
 * Verifica si un CV tiene datos suficientes para mostrar
 * 
 * @param data - Los datos del CV
 * @returns true si tiene al menos información personal
 */
export function hasMinimumCVData(data: CVData): boolean {
  return !!(
    data.personalInfo?.fullName ||
    data.personalInfo?.email ||
    data.experience?.length > 0 ||
    data.education?.length > 0
  );
}

/**
 * Obtiene todas las plantillas disponibles
 * 
 * @returns Array con los nombres de las plantillas disponibles
 */
export function getAvailableTemplates(): string[] {
  return ["modern", "classic", "creative", "minimal", "professional"];
}


