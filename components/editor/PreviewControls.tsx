"use client";

/**
 * Controles de Vista Previa
 * 
 * Permite ajustar el zoom y otras opciones de la vista previa
 */

import { useState } from "react";
import { exportToPNG, exportToJPG, exportToSVG, generateSafeFilename } from "@/lib/export-helpers";

interface PreviewControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onPrint?: () => void;
  cvTitle?: string;
  onExportPDF?: () => void;
  onExportWord?: () => void;
}

export default function PreviewControls({
  zoom,
  onZoomChange,
  onPrint,
  cvTitle,
  onExportPDF,
  onExportWord,
}: PreviewControlsProps) {
  const zoomLevels = [0.5, 0.65, 0.75, 1.0];
  const [exporting, setExporting] = useState<"png" | "jpg" | "svg" | null>(null);
  const [exportError, setExportError] = useState("");

  const handleExportPNG = async () => {
    setExporting("png");
    setExportError("");
    try {
      const filename = cvTitle ? generateSafeFilename(cvTitle) : "cv";
      await exportToPNG("cv-content", filename);
    } catch (error) {
      setExportError("Error al exportar a PNG. Por favor, intenta de nuevo.");
      console.error(error);
    } finally {
      setExporting(null);
    }
  };

  const handleExportJPG = async () => {
    setExporting("jpg");
    setExportError("");
    try {
      const filename = cvTitle ? generateSafeFilename(cvTitle) : "cv";
      await exportToJPG("cv-content", filename);
    } catch (error) {
      setExportError("Error al exportar a JPG. Por favor, intenta de nuevo.");
      console.error(error);
    } finally {
      setExporting(null);
    }
  };

  const handleExportSVG = async () => {
    setExporting("svg");
    setExportError("");
    try {
      const filename = cvTitle ? generateSafeFilename(cvTitle) : "cv";
      await exportToSVG("cv-content", filename);
    } catch (error) {
      setExportError("Error al exportar a SVG. Por favor, intenta de nuevo.");
      console.error(error);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Controles de Zoom */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">Zoom:</span>
        <div className="flex gap-1">
          {zoomLevels.map((level) => (
            <button
              key={level}
              onClick={() => onZoomChange(level)}
              className={`
                px-2 py-1 text-xs rounded transition-colors
                ${
                  zoom === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {Math.round(level * 100)}%
            </button>
          ))}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col gap-2 ml-auto">
        <div className="flex gap-2">
          {onPrint && (
            <button
              onClick={onPrint}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
              title="Imprimir CV"
            >
              🖨️ Imprimir
            </button>
          )}
          <button
            onClick={handleExportPNG}
            disabled={!!exporting}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Exportar a PNG"
          >
            {exporting === "png" ? "⏳..." : "📷 PNG"}
          </button>
          <button
            onClick={handleExportJPG}
            disabled={!!exporting}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Exportar a JPG"
          >
            {exporting === "jpg" ? "⏳..." : "📷 JPG"}
          </button>
          <button
            onClick={handleExportSVG}
            disabled={!!exporting}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Exportar a SVG"
          >
            {exporting === "svg" ? "⏳..." : "📷 SVG"}
          </button>
        </div>
        {exportError && (
          <div className="text-xs text-red-600 text-right">{exportError}</div>
        )}
        <div className="flex gap-2">
          <button
            onClick={onExportWord}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            title="Exportar a Word (próximamente)"
          >
            WORD
          </button>
          <button
            onClick={onExportPDF}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            title="Exportar a PDF (próximamente)"
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}

