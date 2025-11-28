/**
 * Plantilla Creative
 * 
 * Diseño creativo y colorido con:
 * - Colores vibrantes y llamativos
 * - Diseño más visual y dinámico
 * - Elementos decorativos
 * - Ideal para diseñadores, artistas y perfiles creativos
 */

import { CVData } from "@/types/cv";

interface CreativeTemplateProps {
  data: CVData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div id="cv-content" className="creative-template bg-white max-w-4xl mx-auto shadow-2xl print:shadow-none overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header creativo con diseño asimétrico */}
      <header className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white py-12 md:py-16 px-8 md:px-12 overflow-hidden">
        {/* Formas decorativas de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Nombre completo - Estilo creativo */}
          {data.personalInfo.fullName && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tight leading-tight transform hover:scale-105 transition-transform duration-300" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}>
              {data.personalInfo.fullName}
            </h1>
          )}

          {/* Línea decorativa creativa */}
          <div className="h-1.5 bg-white/80 mb-6 rounded-full w-3/4"></div>

          {/* Información de contacto - Estilo más visual */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm md:text-base text-white/95">
              {data.personalInfo.email && (
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="hover:text-white transition-all duration-300 flex items-center gap-2.5 group relative"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">✉️</span>
                  <span className="font-semibold tracking-wide">{data.personalInfo.email}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              )}
              {data.personalInfo.phone && (
                <span className="text-white/95 flex items-center gap-2.5">
                  <span className="text-2xl">📱</span>
                  <span className="font-semibold tracking-wide">{data.personalInfo.phone}</span>
                </span>
              )}
              {data.personalInfo.location && (
                <span className="text-white/95 flex items-center gap-2.5">
                  <span className="text-2xl">📍</span>
                  <span className="font-semibold tracking-wide">{data.personalInfo.location}</span>
                </span>
              )}
            </div>

            {/* Enlaces profesionales - Con iconos más grandes */}
            {(data.personalInfo.website ||
              data.personalInfo.linkedin ||
              data.personalInfo.github) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90 pt-4 border-t border-white/30">
                {data.personalInfo.website && (
                  <a
                    href={data.personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-all duration-300 flex items-center gap-2.5 group relative"
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">🌐</span>
                    <span className="font-semibold tracking-wide">{data.personalInfo.website.replace(/^https?:\/\//, "")}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </a>
                )}
                {data.personalInfo.linkedin && (
                  <>
                    {data.personalInfo.website && <span className="text-white/60 text-lg">•</span>}
                    <a
                      href={data.personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 flex items-center gap-2.5 group relative"
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">💼</span>
                      <span className="font-semibold tracking-wide">LinkedIn</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </>
                )}
                {data.personalInfo.github && (
                  <>
                    {(data.personalInfo.website || data.personalInfo.linkedin) && (
                      <span className="text-white/60 text-lg">•</span>
                    )}
                    <a
                      href={data.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 flex items-center gap-2.5 group relative"
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">💻</span>
                      <span className="font-semibold tracking-wide">GitHub</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal con diseño creativo */}
      <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-b from-white via-purple-50/20 to-white">
        {/* Resumen Profesional - Con diseño especial */}
        {data.summary && (
          <section className="mb-14">
            <div className="flex items-center mb-6">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Resumen
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-7 rounded-2xl border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line font-medium" style={{ lineHeight: '1.9' }}>
                {data.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experiencia Profesional - Con diseño más visual */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Experiencia
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
            </div>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-12 border-l-4 border-gradient-to-b from-purple-500 to-pink-500 pb-9 last:pb-0 group">
                  {/* Punto decorativo creativo */}
                  <div className="absolute -left-6 top-2 w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full border-4 border-white shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div className="flex-1 pr-4">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                        {exp.position}
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm font-black text-gray-800 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 px-5 py-2.5 rounded-xl border-2 border-purple-300 mt-2 md:mt-0 md:ml-4 inline-block md:inline shadow-md">
                      {exp.startDate} - {exp.current ? "Actual" : exp.endDate || "Actual"}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 p-6 rounded-xl border-l-4 border-pink-500 mt-6 shadow-md hover:shadow-lg transition-all duration-300">
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium" style={{ lineHeight: '1.8' }}>
                        {exp.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación - Con diseño creativo */}
        {data.education && data.education.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Educación
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
            </div>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-orange-50/90 p-7 rounded-2xl border-2 border-purple-300 hover:border-pink-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2.5 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                        {edu.degree}
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                        {edu.institution}
                      </p>
                      {edu.field && (
                        <p className="text-sm md:text-base text-gray-600 mt-3 italic font-semibold border-l-4 border-purple-400 pl-4 py-1">{edu.field}</p>
                      )}
                    </div>
                    <div className="text-sm font-black text-gray-800 bg-gradient-to-br from-white via-purple-50 to-pink-50 px-5 py-2.5 rounded-xl border-2 border-purple-400 mt-2 md:mt-0 md:ml-4 inline-block md:inline shadow-md">
                      {edu.startDate} - {edu.current ? "Actual" : edu.endDate || "Actual"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Habilidades - Con diseño más colorido */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Habilidades
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
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
                  beginner: "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 border-purple-300 text-gray-700 hover:from-gray-300 hover:via-gray-200 hover:to-gray-300",
                  intermediate: "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-200 border-blue-400 text-blue-800 hover:from-blue-300 hover:via-blue-200 hover:to-blue-300",
                  advanced: "bg-gradient-to-br from-purple-200 via-purple-100 to-pink-200 border-purple-500 text-purple-800 hover:from-purple-300 hover:via-purple-200 hover:to-pink-300",
                  expert: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 border-purple-700 text-white hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 shadow-xl",
                };

                return (
                  <div
                    key={skill.id}
                    className={`px-6 py-3.5 rounded-xl border-2 text-sm md:text-base font-black transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 hover:scale-110 ${
                      skill.level
                        ? levelStyles[skill.level]
                        : "bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-purple-300 text-gray-700 hover:from-purple-200 hover:via-pink-200 hover:to-orange-200"
                    }`}
                    style={{ letterSpacing: '0.02em' }}
                  >
                    <span className="font-extrabold">{skill.name}</span>
                    {skill.level && (
                      <span className="ml-2.5 text-xs opacity-90 font-bold">
                        ({levelLabels[skill.level]})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Idiomas - Con diseño creativo */}
        {data.languages && data.languages.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Idiomas
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
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
                    className="px-6 py-3.5 rounded-xl border-2 border-purple-400 text-sm md:text-base font-black text-gray-800 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 hover:from-purple-100 hover:via-pink-100 hover:to-orange-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 hover:scale-110"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    <span className="font-extrabold">{lang.name}</span>
                    {lang.level && (
                      <span className="ml-2.5 text-xs text-gray-600 font-bold">
                        ({levelLabels[lang.level]})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Certificaciones - Con diseño creativo */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center mb-9">
              <div className="w-3 h-14 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 mr-5 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mr-5 tracking-tight uppercase" style={{ letterSpacing: '0.05em' }}>
                Certificaciones
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
            </div>
            <div className="space-y-6">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-orange-50/90 p-7 rounded-2xl border-l-4 border-purple-600 hover:border-pink-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="flex items-start gap-5">
                    <div className="mt-2 w-5 h-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-lg"></div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2.5 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
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

