"use client";

/**
 * Selector de Colores de Tema
 * 
 * Permite elegir el color principal del tema del CV
 * Similar a la imagen de referencia con círculos de colores
 */

interface ColorOption {
  id: string;
  name: string;
  color: string;
  gradient: string;
}

const COLOR_THEMES: ColorOption[] = [
  {
    id: "gray",
    name: "Gris",
    color: "bg-gray-600",
    gradient: "from-gray-500 to-gray-700",
  },
  {
    id: "blue",
    name: "Azul",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "pink",
    name: "Rosa",
    color: "bg-pink-400",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    id: "purple",
    name: "Morado",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: "green",
    name: "Verde",
    color: "bg-green-500",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: "beige",
    name: "Beige",
    color: "bg-amber-200",
    gradient: "from-amber-200 to-amber-400",
  },
  {
    id: "black",
    name: "Negro",
    color: "bg-black",
    gradient: "from-gray-900 to-black",
  },
];

interface ColorThemeSelectorProps {
  selectedColor: string;
  onColorChange: (colorId: string) => void;
}

export default function ColorThemeSelector({
  selectedColor,
  onColorChange,
}: ColorThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Elegir color de tema
      </h3>
      <div className="flex flex-wrap gap-4">
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onColorChange(theme.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`
                w-12 h-12 rounded-full ${theme.color} border-2 transition-all
                ${
                  selectedColor === theme.id
                    ? "border-blue-500 scale-110 shadow-lg ring-2 ring-blue-200"
                    : "border-gray-300 group-hover:border-gray-400 group-hover:scale-105"
                }
              `}
            >
              {selectedColor === theme.id && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-600">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



