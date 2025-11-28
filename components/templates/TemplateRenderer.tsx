/**
 * Renderizador de Plantillas
 * 
 * Este componente decide qué plantilla renderizar según el nombre
 * Es como un "selector" que muestra la plantilla correcta
 */

import { CVData } from "@/types/cv";
import TemplateBase from "./TemplateBase";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";

interface TemplateRendererProps {
  templateName: string;
  data: CVData;
}

export default function TemplateRenderer({
  templateName,
  data,
}: TemplateRendererProps) {
  // Validar que el nombre de plantilla sea válido
  const validTemplates = [
    "modern",
    "classic",
    "creative",
    "minimal",
    "professional",
  ];

  const template = validTemplates.includes(templateName.toLowerCase())
    ? templateName.toLowerCase()
    : "modern"; // Fallback a "modern" si no es válido

  // Renderizar la plantilla correspondiente
  // Todas las plantillas ya tienen el ID "cv-content" en su componente base
  switch (template) {
    case "modern":
      return <ModernTemplate data={data} />;
    case "classic":
      return <ClassicTemplate data={data} />;
    case "creative":
    case "minimal":
    case "professional":
    default:
      // Por ahora las demás usan TemplateBase
      // En los siguientes pasos crearemos plantillas específicas
      return <TemplateBase data={data} />;
  }
}

