"use client";

/**
 * Componente de Tabs para el Editor
 * 
 * Muestra diferentes secciones del editor:
 * - Plantilla: Para elegir y personalizar la plantilla
 * - Contenido: Para editar los datos del CV
 * - Colores: Para personalizar los colores del tema
 */

interface EditorTabsProps {
  activeTab: "template" | "content" | "colors";
  onTabChange: (tab: "template" | "content" | "colors") => void;
}

export default function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  const tabs = [
    { id: "template" as const, label: "Plantilla", icon: "🎨" },
    { id: "content" as const, label: "Contenido", icon: "✏️" },
    { id: "colors" as const, label: "Colores", icon: "🎨" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}



