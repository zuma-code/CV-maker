/**
 * Sección de Educación
 * 
 * Muestra la lista de estudios/educación del usuario
 * Incluye: institución, título, campo de estudio y fechas
 */

import { Education } from "@/types/cv";

interface EducationSectionProps {
  education: Education[];
  className?: string;
}

export default function EducationSection({
  education,
  className = "",
}: EducationSectionProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section className={`education-section ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
        Educación
      </h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-base text-blue-600 font-medium">
                  {edu.institution}
                </p>
                {edu.field && (
                  <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1 md:mt-0">
                {edu.startDate} - {edu.current ? "Actual" : edu.endDate || "Actual"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}







