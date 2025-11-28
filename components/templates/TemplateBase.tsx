/**
 * Componente Base para Plantillas
 * 
 * Este componente proporciona la estructura base común para todas las plantillas
 * Incluye estilos comunes, layout base y renderiza las secciones reutilizables
 */

import { CVData } from "@/types/cv";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";

interface TemplateBaseProps {
  data: CVData;
  className?: string;
  children?: React.ReactNode; // Para contenido personalizado de cada plantilla
}

export default function TemplateBase({
  data,
  className = "",
  children,
}: TemplateBaseProps) {
  return (
    <div
      className={`template-base bg-white p-8 md:p-12 max-w-4xl mx-auto shadow-lg ${className}`}
    >
      {/* Información Personal - Siempre al inicio */}
      <PersonalInfoSection personalInfo={data.personalInfo} className="mb-8" />

      {/* Resumen/Summary - Si existe */}
      {data.summary && (
        <section className="summary-section mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
            Resumen Profesional
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.summary}
          </p>
        </section>
      )}

      {/* Contenido personalizado de la plantilla (si existe) */}
      {children}

      {/* Experiencia - Si existe */}
      {data.experience && data.experience.length > 0 && (
        <ExperienceSection experiences={data.experience} className="mt-8" />
      )}

      {/* Educación - Si existe */}
      {data.education && data.education.length > 0 && (
        <EducationSection education={data.education} className="mt-8" />
      )}

      {/* Habilidades - Si existe */}
      {data.skills && data.skills.length > 0 && (
        <SkillsSection skills={data.skills} className="mt-8" />
      )}

      {/* Idiomas - Si existe */}
      {data.languages && data.languages.length > 0 && (
        <section className="languages-section mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Idiomas
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang) => (
              <div
                key={lang.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
              >
                <span>{lang.name}</span>
                {lang.level && (
                  <span className="text-xs opacity-75">
                    ({lang.level === "beginner" && "Principiante"}
                    {lang.level === "intermediate" && "Intermedio"}
                    {lang.level === "advanced" && "Avanzado"}
                    {lang.level === "expert" && "Experto"})
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificaciones - Si existe */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="certifications-section mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            Certificaciones
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="certification-item">
                <h3 className="text-lg font-semibold text-gray-900">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

