/**
 * Plantilla Modern
 * 
 * Diseño moderno y colorido con:
 * - Header con gradiente azul a verde
 * - Secciones bien definidas
 * - Colores vibrantes
 * - Diseño limpio y profesional
 */

import { CVData } from "@/types/cv";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";

interface ModernTemplateProps {
  data: CVData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="modern-template bg-white max-w-4xl mx-auto shadow-2xl overflow-hidden">
      {/* Header con gradiente */}
      <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 text-white p-8 md:p-12">
        <div className="max-w-3xl mx-auto">
          {/* Nombre completo - Grande y destacado */}
          {data.personalInfo.fullName && (
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data.personalInfo.fullName}
            </h1>
          )}

          {/* Información de contacto */}
          <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-95">
            {data.personalInfo.email && (
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="hover:opacity-100 transition-opacity flex items-center gap-2"
              >
                <span>📧</span>
                <span>{data.personalInfo.email}</span>
              </a>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-2">
                <span>📱</span>
                <span>{data.personalInfo.phone}</span>
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-2">
                <span>📍</span>
                <span>{data.personalInfo.location}</span>
              </span>
            )}
          </div>

          {/* Redes sociales */}
          {(data.personalInfo.website ||
            data.personalInfo.linkedin ||
            data.personalInfo.github) && (
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              {data.personalInfo.website && (
                <a
                  href={data.personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span>🌐</span>
                  <span>{data.personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
              {data.personalInfo.linkedin && (
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
              )}
              {data.personalInfo.github && (
                <a
                  href={data.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span>💻</span>
                  <span>GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <div className="p-8 md:p-12">
        {/* Resumen Profesional */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Resumen Profesional
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experiencia */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
              Experiencia Profesional
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-2 md:mt-0 md:ml-4 bg-white px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? "Actual" : exp.endDate || "Actual"}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-3 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación */}
        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
              Educación
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600">
                        {edu.institution}
                      </p>
                      {edu.field && (
                        <p className="text-sm text-gray-600 mt-2">{edu.field}</p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-2 md:mt-0 md:ml-4 bg-white px-3 py-1 rounded-full">
                      {edu.startDate} - {edu.current ? "Actual" : edu.endDate || "Actual"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Habilidades */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => {
                const levelColors = {
                  beginner: "bg-gray-200 text-gray-700 border-gray-300",
                  intermediate: "bg-blue-100 text-blue-700 border-blue-300",
                  advanced: "bg-green-100 text-green-700 border-green-300",
                  expert: "bg-purple-100 text-purple-700 border-purple-300",
                };

                const levelLabels = {
                  beginner: "Principiante",
                  intermediate: "Intermedio",
                  advanced: "Avanzado",
                  expert: "Experto",
                };

                return (
                  <div
                    key={skill.id}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                      skill.level
                        ? levelColors[skill.level]
                        : "bg-blue-100 text-blue-700 border-blue-300"
                    }`}
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="ml-2 text-xs opacity-75">
                        ({levelLabels[skill.level]})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Idiomas */}
        {data.languages && data.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
              Idiomas
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang) => {
                const levelLabels = {
                  beginner: "Principiante",
                  intermediate: "Intermedio",
                  advanced: "Avanzado",
                  expert: "Nativo",
                };

                return (
                  <div
                    key={lang.id}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 border-2 border-green-300"
                  >
                    <span>{lang.name}</span>
                    {lang.level && (
                      <span className="ml-2 text-xs opacity-75">
                        ({levelLabels[lang.level]})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Certificaciones */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
              Certificaciones
            </h2>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
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
    </div>
  );
}

