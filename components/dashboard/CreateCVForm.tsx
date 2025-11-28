"use client";

/**
 * Formulario para crear un nuevo CV
 * 
 * Este componente muestra:
 * - Un campo para escribir el título del CV
 * - Opciones para elegir una plantilla
 * - Un botón para crear el CV
 * 
 * Es un "client component" porque necesita interactividad
 * (botones que se pueden hacer click, inputs donde escribir, etc.)
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

// Las plantillas disponibles (por ahora solo estas dos, luego añadiremos más)
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Diseño moderno y colorido",
    color: "bg-blue-500",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Diseño tradicional y profesional",
    color: "bg-gray-700",
  },
];

export default function CreateCVForm() {
  const router = useRouter(); // Para navegar a otras páginas después de crear el CV
  const [formData, setFormData] = useState({
    title: "",
    template: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Esta función se ejecuta cuando el usuario hace click en "Crear CV"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(""); // Limpia errores anteriores
    setLoading(true); // Muestra que está procesando

    try {
      // Enviamos los datos al servidor (a nuestra API)
      const response = await fetch("/api/cv/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          template: formData.template,
        }),
      });

      const data = await response.json();

      // Si hay un error, lo mostramos
      if (!response.ok) {
        setError(data.error || "Error al crear el CV");
        setLoading(false);
        return;
      }

      // Si todo salió bien, volvemos al dashboard para ver el CV creado
      // (El editor aún no está implementado, así que redirigimos al dashboard)
      router.push("/dashboard");
      router.refresh(); // Refrescar para mostrar el nuevo CV en la lista
    } catch (error) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {/* Título del formulario */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">Crear Nuevo CV</h2>
          <p className="text-center text-gray-600 text-sm">
            Elige un título y una plantilla para empezar
          </p>
        </div>

        {/* Mensaje de error si hay alguno */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Campo para el título del CV */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título del CV *
          </label>
          <input
            id="title"
            type="text"
            required
            minLength={3}
            maxLength={100}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: CV Frontend Developer 2024"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mínimo 3 caracteres. Este título aparecerá en tu lista de CVs.
          </p>
        </div>

        {/* Selección de plantilla */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Elige una plantilla *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => setFormData({ ...formData, template: template.id })}
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all
                  ${
                    formData.template === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      formData.template === template.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.template === template.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-600 ml-7">{template.description}</p>
              </div>
            ))}
          </div>
          {!formData.template && (
            <p className="mt-2 text-xs text-red-500">Debes seleccionar una plantilla</p>
          )}
        </div>

        {/* Botón para crear el CV */}
        <button
          type="submit"
          disabled={loading || !formData.title.trim() || !formData.template}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creando CV..." : "Crear CV"}
        </button>

        {/* Link para volver al dashboard */}
        <p className="text-center text-sm text-gray-600">
          <a href="/dashboard" className="text-blue-600 hover:underline">
            ← Volver al dashboard
          </a>
        </p>
      </form>
    </div>
  );
}

