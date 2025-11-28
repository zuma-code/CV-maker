"use client";

/**
 * Layout del Editor Mejorado
 * 
 * Este componente organiza el editor con:
 * - Tabs para diferentes secciones (Plantilla, Contenido, Colores)
 * - Panel izquierdo: Controles y formularios
 * - Panel derecho: Vista previa en tiempo real
 * 
 * Es un "client component" porque maneja el estado del CV
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { CVData } from "@/types/cv";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import PersonalInfoForm from "./sections/PersonalInfoForm";
import ExperienceForm from "./sections/ExperienceForm";
import EducationForm from "./sections/EducationForm";
import SkillsForm from "./sections/SkillsForm";
import LanguagesForm from "./sections/LanguagesForm";
import CertificationsForm from "./sections/CertificationsForm";
import EditorTabs from "./EditorTabs";
import TemplateSelector from "./TemplateSelector";
import ColorThemeSelector from "./ColorThemeSelector";
import PreviewControls from "./PreviewControls";

interface EditorLayoutProps {
  initialData: CVData;
  templateName: string;
  cvId: string;
  cvTitle?: string;
}

export default function EditorLayout({
  initialData,
  templateName,
  cvId,
  cvTitle,
}: EditorLayoutProps) {
  // Estado local del CV (se actualiza mientras el usuario edita)
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [currentTemplate, setCurrentTemplate] = useState(templateName);
  const [themeColor, setThemeColor] = useState("blue");
  const [activeTab, setActiveTab] = useState<"template" | "content" | "colors">("content");
  const [previewZoom, setPreviewZoom] = useState(0.65);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const isInitialMount = useRef(true);

  // Función para imprimir el CV
  const handlePrint = useCallback(() => {
    // Abrir ventana de impresión del navegador
    window.print();
  }, []);

  // Función para actualizar los datos del CV
  const updateCVData = (newData: CVData) => {
    setCvData(newData);
    setSaved(false);
  };

  // Función para guardar el CV
  const saveCV = useCallback(async () => {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/cv/${cvId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          data: cvData,
          template: currentTemplate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Error al guardar el CV");
        setSaving(false);
        return;
      }

      setSaved(true);
      setSaving(false);

      // Ocultar el mensaje de "guardado" después de 2 segundos
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
      setSaving(false);
    }
  }, [cvData, cvId, currentTemplate]);

  // Función para cambiar la plantilla
  const handleTemplateChange = async (newTemplate: string) => {
    setCurrentTemplate(newTemplate);
    // Guardar el cambio de plantilla
    try {
      await fetch(`/api/cv/${cvId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          data: cvData,
          template: newTemplate,
        }),
      });
    } catch (error) {
      console.error("Error al cambiar plantilla:", error);
    }
  };

  // Guardado automático después de 2 segundos sin cambios
  useEffect(() => {
    // No guardar en el primer render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // No guardar si los datos son iguales a los iniciales
    if (JSON.stringify(cvData) === JSON.stringify(initialData)) {
      return;
    }

    const timer = setTimeout(() => {
      saveCV();
    }, 2000);

    return () => clearTimeout(timer);
  }, [cvData, initialData, saveCV]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón guardar */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {cvTitle ? `Editando: ${cvTitle}` : "Editor de CV"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {saving && (
                <span className="text-sm text-gray-600">Guardando...</span>
              )}
              {saved && (
                <span className="text-sm text-green-600">✓ Guardado</span>
              )}
              {error && (
                <span className="text-sm text-red-600">{error}</span>
              )}
              <button
                onClick={saveCV}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-[57px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Layout principal: Panel de Control + Vista Previa */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda: Panel de Control */}
          <div className="space-y-6">
            {/* Tab: Plantilla */}
            {activeTab === "template" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <TemplateSelector
                  selectedTemplate={currentTemplate}
                  onTemplateChange={handleTemplateChange}
                />
              </div>
            )}

            {/* Tab: Colores */}
            {activeTab === "colors" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ColorThemeSelector
                  selectedColor={themeColor}
                  onColorChange={setThemeColor}
                />
              </div>
            )}

            {/* Tab: Contenido */}
            {activeTab === "content" && (
              <div className="space-y-6">
                {/* Información Personal */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información Personal
                  </h3>
                  <PersonalInfoForm
                    data={cvData.personalInfo}
                    summary={cvData.summary || ""}
                    onUpdate={(personalInfo, summary) => {
                      updateCVData({
                        ...cvData,
                        personalInfo,
                        summary: summary || "",
                      });
                    }}
                  />
                </div>

                {/* Experiencia Laboral */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Experiencia Laboral
                  </h3>
                  <ExperienceForm
                    experiences={cvData.experience || []}
                    onUpdate={(experiences) => {
                      updateCVData({
                        ...cvData,
                        experience: experiences,
                      });
                    }}
                  />
                </div>

                {/* Educación */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Educación
                  </h3>
                  <EducationForm
                    education={cvData.education || []}
                    onUpdate={(education) => {
                      updateCVData({
                        ...cvData,
                        education: education,
                      });
                    }}
                  />
                </div>

                {/* Habilidades */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Habilidades
                  </h3>
                  <SkillsForm
                    skills={cvData.skills || []}
                    onUpdate={(skills) => {
                      updateCVData({
                        ...cvData,
                        skills: skills,
                      });
                    }}
                  />
                </div>

                {/* Idiomas */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Idiomas
                  </h3>
                  <LanguagesForm
                    languages={cvData.languages || []}
                    onUpdate={(languages) => {
                      updateCVData({
                        ...cvData,
                        languages: languages,
                      });
                    }}
                  />
                </div>

                {/* Certificaciones */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Certificaciones
                  </h3>
                  <CertificationsForm
                    certifications={cvData.certifications || []}
                    onUpdate={(certifications) => {
                      updateCVData({
                        ...cvData,
                        certifications: certifications,
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha: Vista Previa */}
          <div className="lg:sticky lg:top-[105px] lg:h-[calc(100vh-105px)] lg:overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Vista Previa
                </h3>
                <PreviewControls
                  zoom={previewZoom}
                  onZoomChange={setPreviewZoom}
                  onPrint={handlePrint}
                  cvTitle={cvTitle}
                  onExportPDF={() => {
                    // TODO: Implementar exportación a PDF
                    alert("Exportación a PDF próximamente");
                  }}
                  onExportWord={() => {
                    // TODO: Implementar exportación a WORD
                    alert("Exportación a WORD próximamente");
                  }}
                />
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <div
                  id="cv-preview"
                  className="origin-top-left transition-transform duration-200"
                  style={{
                    transform: `scale(${previewZoom})`,
                    width: `${100 / previewZoom}%`,
                  }}
                >
                  <TemplateRenderer templateName={currentTemplate} data={cvData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

