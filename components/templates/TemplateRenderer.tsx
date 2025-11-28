/**
 * Renderizador de Plantillas
 * 
 * Este componente decide qué plantilla renderizar según el nombre
 * Es como un "selector" que muestra la plantilla correcta
 */

import { CVData } from "@/types/cv";
import TemplateBase from "./TemplateBase";

// Importaremos las plantillas específicas cuando las creemos
// Por ahora, usamos TemplateBase como fallback

interface TemplateRendererProps {
  templateName: string;
  data: CVData;
}

export default function TemplateRenderer({
  templateName,
  data,
}: TemplateRendererProps) {
  // Por ahora, todas las plantillas usan TemplateBase
  // Más adelante añadiremos plantillas específicas como ModernTemplate, ClassicTemplate, etc.
  
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

  // Renderizar la plantilla base por ahora
  // Más adelante haremos un switch/case para cada plantilla
  switch (template) {
    case "modern":
    case "classic":
    case "creative":
    case "minimal":
    case "professional":
    default:
      // Por ahora todas usan TemplateBase
      // En los siguientes pasos crearemos plantillas específicas
      return <TemplateBase data={data} />;
  }
}

