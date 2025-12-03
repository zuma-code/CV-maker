"use client";

/**
 * Formulario de Habilidades
 * 
 * Permite añadir, editar y eliminar habilidades
 */

import { useState } from "react";
import { Skill } from "@/types/cv";

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const SKILL_LEVELS = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Experto" },
] as const;

export default function SkillsForm({ skills, onUpdate }: SkillsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const generateId = () => `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState<Skill>({
    id: generateId(),
    name: "",
    level: undefined,
  });

  const startEdit = (index: number) => {
    setFormData(skills[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setFormData({
      id: generateId(),
      name: "",
      level: undefined,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const saveSkill = () => {
    const newSkills = [...skills];
    
    if (editingIndex !== null) {
      newSkills[editingIndex] = formData;
    } else {
      newSkills.push(formData);
    }

    onUpdate(newSkills);
    cancelEdit();
  };

  const deleteSkill = (index: number) => {
    if (confirm("¿Estás seguro de eliminar esta habilidad?")) {
      const newSkills = skills.filter((_, i) => i !== index);
      onUpdate(newSkills);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{skill.name}</span>
                {skill.level && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({SKILL_LEVELS.find((l) => l.value === skill.level)?.label})
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(index)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteSkill(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay habilidades añadidas. Haz clic en "Añadir Habilidad" para empezar.
          </p>
        )}
      </div>

      {showForm ? (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editingIndex !== null ? "Editar Habilidad" : "Nueva Habilidad"}
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Habilidad *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JavaScript, React, Python..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nivel (Opcional)
              </label>
              <select
                value={formData.level || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    level: e.target.value ? (e.target.value as Skill["level"]) : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sin nivel</option>
                {SKILL_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveSkill}
                disabled={!formData.name}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          + Añadir Habilidad
        </button>
      )}
    </div>
  );
}







