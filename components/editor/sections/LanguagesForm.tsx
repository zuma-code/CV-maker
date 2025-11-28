"use client";

/**
 * Formulario de Idiomas
 * 
 * Permite añadir, editar y eliminar idiomas
 */

import { useState } from "react";
import { Skill } from "@/types/cv";

interface LanguagesFormProps {
  languages: Skill[];
  onUpdate: (languages: Skill[]) => void;
}

const LANGUAGE_LEVELS = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Nativo" },
] as const;

export default function LanguagesForm({ languages, onUpdate }: LanguagesFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const generateId = () => `language-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState<Skill>({
    id: generateId(),
    name: "",
    level: undefined,
  });

  const startEdit = (index: number) => {
    setFormData(languages[index]);
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

  const saveLanguage = () => {
    const newLanguages = [...languages];
    
    if (editingIndex !== null) {
      newLanguages[editingIndex] = formData;
    } else {
      newLanguages.push(formData);
    }

    onUpdate(newLanguages);
    cancelEdit();
  };

  const deleteLanguage = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este idioma?")) {
      const newLanguages = languages.filter((_, i) => i !== index);
      onUpdate(newLanguages);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {languages.map((language, index) => (
          <div
            key={language.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{language.name}</span>
                {language.level && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({LANGUAGE_LEVELS.find((l) => l.value === language.level)?.label})
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
                  onClick={() => deleteLanguage(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {languages.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay idiomas añadidos. Haz clic en "Añadir Idioma" para empezar.
          </p>
        )}
      </div>

      {showForm ? (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editingIndex !== null ? "Editar Idioma" : "Nuevo Idioma"}
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Idioma *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Español, Inglés, Francés..."
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
                {LANGUAGE_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveLanguage}
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
          + Añadir Idioma
        </button>
      )}
    </div>
  );
}

