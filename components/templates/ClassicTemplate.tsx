/**
 * Plantilla Classic
 * 
 * Diseño tradicional y conservador con:
 * - Header negro/gris oscuro
 * - Colores neutros (negro, gris, blanco)
 * - Tipografía serif clásica
 * - Líneas divisorias entre secciones
 * - Diseño formal y estructurado
 * - Ideal para trabajos corporativos
 */

import { CVData } from "@/types/cv";

interface ClassicTemplateProps {
  data: CVData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div id="cv-content" className="classic-template bg-white max-w-4xl mx-auto shadow-2xl print:shadow-none border border-gray-300 overflow-hidden" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {/* Header con fondo oscuro elegante */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-14 md:py-16 px-8 md:px-12 border-b-4 border-gray-700 relative overflow-hidden">
        {/* Patrón decorativo sutil mejorado */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,.05) 15px, rgba(255,255,255,.05) 30px)'
          }}></div>
        </div>
        
        {/* Efecto de brillo sutil */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Nombre completo - Tipografía serif clásica con mejor espaciado */}
          {data.personalInfo.fullName && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-8 text-white tracking-tight leading-[1.1] drop-shadow-2xl">
              <span className="relative inline-block">
                <span className="relative z-10">{data.personalInfo.fullName}</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-white/20"></span>
              </span>
            </h1>
          )}

          {/* Línea divisoria elegante con gradiente mejorado */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-px bg-white/50"></div>
          </div>

          {/* Información de contacto - Mejor organizada */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm md:text-base text-gray-200">
              {data.personalInfo.email && (
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="hover:text-white transition-all duration-300 border-b border-transparent hover:border-white/50 flex items-center gap-2 group relative"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors text-lg">✉</span>
                  <span className="font-medium tracking-wide">{data.personalInfo.email}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-300"></span>
                </a>
              )}
              {data.personalInfo.phone && (
                <span className="text-gray-200 flex items-center gap-2">
                  <span className="text-gray-400 text-lg">📞</span>
                  <span className="font-medium tracking-wide">{data.personalInfo.phone}</span>
                </span>
              )}
              {data.personalInfo.location && (
                <span className="text-gray-200 flex items-center gap-2">
                  <span className="text-gray-400 text-lg">📍</span>
                  <span className="font-medium tracking-wide">{data.personalInfo.location}</span>
                </span>
              )}
            </div>

            {/* Enlaces profesionales - Con separadores elegantes */}
            {(data.personalInfo.website ||
              data.personalInfo.linkedin ||
              data.personalInfo.github) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 pt-4 border-t border-gray-700/50">
                {data.personalInfo.website && (
                  <a
                    href={data.personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-all duration-300 flex items-center gap-2 group relative"
                  >
                    <span className="text-gray-500 group-hover:text-white transition-colors text-base">🌐</span>
                    <span className="font-medium tracking-wide">{data.personalInfo.website.replace(/^https?:\/\//, "")}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-300"></span>
                  </a>
                )}
                {data.personalInfo.linkedin && (
                  <>
                    {data.personalInfo.website && <span className="text-gray-600 text-lg">•</span>}
                    <a
                      href={data.personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 flex items-center gap-2 group relative"
                    >
                      <span className="text-gray-500 group-hover:text-white transition-colors text-base">💼</span>
                      <span className="font-medium tracking-wide">LinkedIn</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </>
                )}
                {data.personalInfo.github && (
                  <>
                    {(data.personalInfo.website || data.personalInfo.linkedin) && (
                      <span className="text-gray-600 text-lg">•</span>
                    )}
                    <a
                      href={data.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 flex items-center gap-2 group relative"
                    >
                      <span className="text-gray-500 group-hover:text-white transition-colors text-base">💻</span>
                      <span className="font-medium tracking-wide">GitHub</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-b from-white via-gray-50/20 to-white">
        {/* Resumen Profesional */}
        {data.summary && (
          <section className="mb-14">
            <div className="flex items-center mb-7">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Resumen Profesional
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="bg-gradient-to-br from-gray-50/80 via-white to-gray-50/60 p-7 rounded-xl border-l-4 border-gray-500 shadow-md hover:shadow-lg transition-all duration-300">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line font-serif" style={{ lineHeight: '1.8' }}>
                {data.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experiencia Profesional */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Experiencia Profesional
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="space-y-9">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="experience-item relative pl-12 border-l-4 border-gray-500 pb-9 last:pb-0 group">
                  {/* Punto decorativo mejorado con efecto hover */}
                  <div className="absolute -left-5 top-2 w-7 h-7 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-full border-4 border-white shadow-xl group-hover:scale-125 group-hover:shadow-2xl transition-all duration-300"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2.5 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                        {exp.position}
                      </h3>
                      <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-gray-800 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-5 py-2.5 rounded-lg border-2 border-gray-400 mt-2 md:mt-0 md:ml-4 inline-block md:inline shadow-md">
                      {exp.startDate} - {exp.current ? "Actual" : exp.endDate || "Actual"}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 p-6 rounded-xl border-l-4 border-gray-400 mt-6 shadow-md hover:shadow-lg transition-all duration-300">
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line font-serif" style={{ lineHeight: '1.75' }}>
                        {exp.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación */}
        {data.education && data.education.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Educación
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="education-item bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 p-7 rounded-2xl border-2 border-gray-300 hover:border-gray-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2.5 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                        {edu.degree}
                      </h3>
                      <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                        {edu.institution}
                      </p>
                      {edu.field && (
                        <p className="text-sm md:text-base text-gray-600 mt-3 italic font-medium border-l-3 border-gray-400 pl-4 py-1">{edu.field}</p>
                      )}
                    </div>
                    <div className="text-sm font-bold text-gray-800 bg-gradient-to-br from-white via-gray-50 to-gray-100 px-5 py-2.5 rounded-lg border-2 border-gray-400 mt-2 md:mt-0 md:ml-4 inline-block md:inline shadow-md">
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
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Habilidades
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-3.5">
              {data.skills.map((skill) => {
                const levelLabels = {
                  beginner: "Principiante",
                  intermediate: "Intermedio",
                  advanced: "Avanzado",
                  expert: "Experto",
                };

                const levelStyles = {
                  beginner: "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 border-gray-400 text-gray-700 hover:from-gray-200 hover:via-gray-100 hover:to-gray-300",
                  intermediate: "bg-gradient-to-br from-gray-200 via-gray-150 to-gray-300 border-gray-500 text-gray-800 hover:from-gray-300 hover:via-gray-200 hover:to-gray-400",
                  advanced: "bg-gradient-to-br from-gray-300 via-gray-250 to-gray-400 border-gray-600 text-gray-900 hover:from-gray-400 hover:via-gray-300 hover:to-gray-500",
                  expert: "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border-gray-900 text-white hover:from-gray-900 hover:via-gray-800 hover:to-black shadow-xl",
                };

                return (
                  <div
                    key={skill.id}
                    className={`px-6 py-3.5 rounded-xl border-2 text-sm md:text-base font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 hover:scale-110 ${
                      skill.level
                        ? levelStyles[skill.level]
                        : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 border-gray-400 text-gray-700 hover:from-gray-200 hover:via-gray-100 hover:to-gray-300"
                    }`}
                    style={{ letterSpacing: '0.02em' }}
                  >
                    <span className="font-extrabold">{skill.name}</span>
                    {skill.level && (
                      <span className="ml-2.5 text-xs opacity-90 font-semibold">
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
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Idiomas
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="flex flex-wrap gap-3.5">
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
                    className="px-6 py-3.5 rounded-xl border-2 border-gray-500 text-sm md:text-base font-bold text-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-50 hover:from-gray-100 hover:via-gray-50 hover:to-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 hover:scale-110"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    <span className="font-extrabold">{lang.name}</span>
                    {lang.level && (
                      <span className="ml-2.5 text-xs text-gray-600 font-semibold">
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
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-2 h-12 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mr-5 rounded-full shadow-md"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mr-5 tracking-wide uppercase" style={{ letterSpacing: '0.05em' }}>
                Certificaciones
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-400 via-gray-300 to-transparent"></div>
            </div>
            <div className="space-y-6">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="certification-item bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 p-7 rounded-2xl border-l-4 border-gray-600 hover:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="flex items-start gap-5">
                    <div className="mt-2 w-4 h-4 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full shadow-lg"></div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2.5 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                        {cert.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        <span className="font-bold text-gray-700">{cert.issuer}</span> - <span className="text-gray-500 italic">{cert.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

