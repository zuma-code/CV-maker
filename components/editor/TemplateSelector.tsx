"use client";

/**
 * Selector Visual de Plantillas
 * 
 * Muestra las plantillas disponibles como tarjetas visuales
 * Similar a la imagen de referencia
 */

import { getTemplateDisplayName } from "@/lib/template-helpers";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  badge?: string;
  badgeColor?: string;
}

const TEMPLATES: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Diseño moderno y colorido",
    preview: "bg-gradient-to-br from-blue-500 to-green-500",
    badge: "Más elegido",
    badgeColor: "bg-green-500",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Diseño tradicional y profesional",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    badge: "Recomendado",
    badgeColor: "bg-orange-500",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Diseño creativo y único",
    preview: "bg-gradient-to-br from-purple-500 to-pink-500",
    badge: "Nuevo",
    badgeColor: "bg-blue-500",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Diseño minimalista y elegante",
    preview: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Diseño profesional y corporativo",
    preview: "bg-gradient-to-br from-indigo-600 to-blue-700",
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Elegir Plantilla
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`
              relative cursor-pointer rounded-lg border-2 transition-all
              ${
                selectedTemplate === template.id
                  ? "border-blue-500 shadow-lg scale-105"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            {/* Badge */}
            {template.badge && (
              <div
                className={`absolute top-0 right-0 ${template.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg transform rotate-12`}
              >
                {template.badge}
              </div>
            )}

            {/* Preview */}
            <div className="p-4">
              <div
                className={`h-32 rounded-md ${template.preview} mb-3 flex items-center justify-center`}
              >
                <span className="text-white text-sm font-medium">
                  {getTemplateDisplayName(template.id)}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {template.name}
              </h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>

            {/* Checkmark si está seleccionado */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


