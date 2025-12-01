"use client";

/**
 * Formulario de Educación
 * 
 * Permite añadir, editar y eliminar estudios
 */

import { useState } from "react";
import { Education } from "@/types/cv";

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export default function EducationForm({
  education,
  onUpdate,
}: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const generateId = () => `edu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState<Education>({
    id: generateId(),
    degree: "",
    institution: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  const startEdit = (index: number) => {
    setFormData(education[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setFormData({
      id: generateId(),
      degree: "",
      institution: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const saveEducation = () => {
    const newEducation = [...education];
    
    if (editingIndex !== null) {
      newEducation[editingIndex] = formData;
    } else {
      newEducation.push(formData);
    }

    onUpdate(newEducation);
    cancelEdit();
  };

  const deleteEducation = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este estudio?")) {
      const newEducation = education.filter((_, i) => i !== index);
      onUpdate(newEducation);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                <p className="text-sm text-blue-600">{edu.institution}</p>
                {edu.field && (
                  <p className="text-xs text-gray-500 mt-1">{edu.field}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {edu.startDate} - {edu.current ? "Actual" : edu.endDate || "Actual"}
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
                  onClick={() => deleteEducation(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay estudios añadidos. Haz clic en "Añadir Educación" para empezar.
          </p>
        )}
      </div>

      {showForm ? (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editingIndex !== null ? "Editar Educación" : "Nueva Educación"}
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título/Grado *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Grado en Ingeniería Informática"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institución *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Universidad de..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campo de Estudio
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingeniería de Software"
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
                  placeholder="2018"
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
                  placeholder="2022"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current-edu"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: "" })}
                className="mr-2"
              />
              <label htmlFor="current-edu" className="text-sm text-gray-700">
                Estudiando actualmente
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveEducation}
                disabled={!formData.degree || !formData.institution || !formData.startDate}
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
          + Añadir Educación
        </button>
      )}
    </div>
  );
}



