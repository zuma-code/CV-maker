"use client";

/**
 * Formulario de Experiencia Laboral
 * 
 * Permite añadir, editar y eliminar experiencias laborales
 */

import { useState } from "react";
import { Experience } from "@/types/cv";

interface ExperienceFormProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export default function ExperienceForm({
  experiences,
  onUpdate,
}: ExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Generar ID único para nuevas experiencias
  const generateId = () => `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Estado del formulario
  const [formData, setFormData] = useState<Experience>({
    id: generateId(),
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Iniciar edición
  const startEdit = (index: number) => {
    setFormData(experiences[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setFormData({
      id: generateId(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  // Guardar experiencia
  const saveExperience = () => {
    const newExperiences = [...experiences];
    
    if (editingIndex !== null) {
      // Editar existente
      newExperiences[editingIndex] = formData;
    } else {
      // Añadir nueva
      newExperiences.push(formData);
    }

    onUpdate(newExperiences);
    cancelEdit();
  };

  // Eliminar experiencia
  const deleteExperience = (index: number) => {
    if (confirm("¿Estás seguro de eliminar esta experiencia?")) {
      const newExperiences = experiences.filter((_, i) => i !== index);
      onUpdate(newExperiences);
    }
  };

  return (
    <div className="space-y-4">
      {/* Lista de experiencias */}
      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <p className="text-sm text-blue-600">{exp.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate} - {exp.current ? "Actual" : exp.endDate || "Actual"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(index)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteExperience(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay experiencias añadidas. Haz clic en "Añadir Experiencia" para empezar.
          </p>
        )}
      </div>

      {/* Formulario (mostrar/ocultar) */}
      {showForm ? (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editingIndex !== null ? "Editar Experiencia" : "Nueva Experiencia"}
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puesto *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Desarrollador Frontend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de la empresa"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Inicio *
                </label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enero 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Fin
                </label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value, current: false })}
                  disabled={formData.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="Diciembre 2023"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: "" })}
                className="mr-2"
              />
              <label htmlFor="current" className="text-sm text-gray-700">
                Trabajo actual
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe tus responsabilidades y logros..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveExperience}
                disabled={!formData.position || !formData.company || !formData.startDate}
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
          + Añadir Experiencia
        </button>
      )}
    </div>
  );
}


