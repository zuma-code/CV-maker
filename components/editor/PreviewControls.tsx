"use client";

/**
 * Controles de Vista Previa
 * 
 * Permite ajustar el zoom y otras opciones de la vista previa
 */

interface PreviewControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onPrint?: () => void;
  onExportPDF?: () => void;
  onExportWord?: () => void;
}

export default function PreviewControls({
  zoom,
  onZoomChange,
  onPrint,
  onExportPDF,
  onExportWord,
}: PreviewControlsProps) {
  const zoomLevels = [0.5, 0.65, 0.75, 1.0];

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
      <div className="flex gap-2 ml-auto">
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
  );
}

