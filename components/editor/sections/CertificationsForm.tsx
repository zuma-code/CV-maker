"use client";

/**
 * Formulario de Certificaciones
 * 
 * Permite añadir, editar y eliminar certificaciones
 */

import { useState } from "react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface CertificationsFormProps {
  certifications: Certification[];
  onUpdate: (certifications: Certification[]) => void;
}

export default function CertificationsForm({ certifications, onUpdate }: CertificationsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const generateId = () => `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [formData, setFormData] = useState<Certification>({
    id: generateId(),
    name: "",
    issuer: "",
    date: "",
  });

  const startEdit = (index: number) => {
    setFormData(certifications[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setFormData({
      id: generateId(),
      name: "",
      issuer: "",
      date: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const saveCertification = () => {
    const newCertifications = [...certifications];
    
    if (editingIndex !== null) {
      newCertifications[editingIndex] = formData;
    } else {
      newCertifications.push(formData);
    }

    onUpdate(newCertifications);
    cancelEdit();
  };

  const deleteCertification = (index: number) => {
    if (confirm("¿Estás seguro de eliminar esta certificación?")) {
      const newCertifications = certifications.filter((_, i) => i !== index);
      onUpdate(newCertifications);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                <p className="text-sm text-gray-600">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => startEdit(index)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteCertification(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay certificaciones añadidas. Haz clic en "Añadir Certificación" para empezar.
          </p>
        )}
      </div>

      {showForm ? (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editingIndex !== null ? "Editar Certificación" : "Nueva Certificación"}
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Certificación *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AWS Certified Solutions Architect..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emisor / Organización *
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amazon Web Services, Google..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha *
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enero 2024, 2024..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveCertification}
                disabled={!formData.name || !formData.issuer || !formData.date}
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
          + Añadir Certificación
        </button>
      )}
    </div>
  );
}


