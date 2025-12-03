/**
 * Sección de Información Personal
 * 
 * Muestra el nombre completo, email, teléfono, ubicación y redes sociales
 * Esta sección se usa en todas las plantillas
 */

import { PersonalInfo } from "@/types/cv";

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  className?: string;
}

export default function PersonalInfoSection({
  personalInfo,
  className = "",
}: PersonalInfoSectionProps) {
  const { fullName, email, phone, location, website, linkedin, github } =
    personalInfo;

  return (
    <div className={`personal-info-section ${className}`}>
      {/* Nombre completo */}
      {fullName && (
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{fullName}</h1>
      )}

      {/* Información de contacto */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {email && (
          <a
            href={`mailto:${email}`}
            className="hover:text-blue-600 transition-colors"
          >
            📧 {email}
          </a>
        )}
        {phone && (
          <span className="flex items-center gap-1">
            📱 {phone}
          </span>
        )}
        {location && (
          <span className="flex items-center gap-1">
            📍 {location}
          </span>
        )}
      </div>

      {/* Redes sociales */}
      {(website || linkedin || github) && (
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              🌐 {website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              💼 LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              💻 GitHub
            </a>
          )}
        </div>
      )}
    </div>
  );
}







