/**
 * Sección de Experiencia Laboral
 * 
 * Muestra la lista de trabajos/experiencias del usuario
 * Incluye: empresa, puesto, fechas y descripción
 */

import { Experience } from "@/types/cv";

interface ExperienceSectionProps {
  experiences: Experience[];
  className?: string;
}

export default function ExperienceSection({
  experiences,
  className = "",
}: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className={`experience-section ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
        Experiencia Profesional
      </h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.position}
                </h3>
                <p className="text-base text-blue-600 font-medium">
                  {exp.company}
                </p>
              </div>
              <div className="text-sm text-gray-500 mt-1 md:mt-0">
                {exp.startDate} - {exp.current ? "Actual" : exp.endDate || "Actual"}
              </div>
            </div>
            {exp.description && (
              <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


