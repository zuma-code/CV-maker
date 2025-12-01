/**
 * Sección de Habilidades
 * 
 * Muestra las habilidades del usuario
 * Puede mostrar niveles (beginner, intermediate, advanced, expert)
 */

import { Skill } from "@/types/cv";

interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}

const levelColors = {
  beginner: "bg-gray-200 text-gray-700",
  intermediate: "bg-blue-200 text-blue-700",
  advanced: "bg-green-200 text-green-700",
  expert: "bg-purple-200 text-purple-700",
};

const levelLabels = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  expert: "Experto",
};

export default function SkillsSection({
  skills,
  className = "",
}: SkillsSectionProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className={`skills-section ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
        Habilidades
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              skill.level
                ? levelColors[skill.level]
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <span>{skill.name}</span>
            {skill.level && (
              <span className="text-xs opacity-75">
                ({levelLabels[skill.level]})
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}



