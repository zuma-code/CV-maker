"use client";

/**
 * Botón para eliminar un CV
 * 
 * Este componente muestra un botón "Eliminar" que:
 * 1. Muestra un modal de confirmación cuando haces click
 * 2. Si confirmas, elimina el CV de la base de datos
 * 3. Actualiza la lista sin recargar toda la página
 * 
 * Es un "client component" porque necesita interactividad
 * (mostrar modal, hacer click, etc.)
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteCVButtonProps {
  cvId: string;
  cvTitle: string;
}

export default function DeleteCVButton({ cvId, cvTitle }: DeleteCVButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Controla si se muestra el modal
  const [loading, setLoading] = useState(false); // Controla si está procesando
  const [error, setError] = useState(""); // Para mostrar errores

  // Esta función se ejecuta cuando haces click en "Eliminar"
  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      // Enviamos una petición DELETE al servidor
      const response = await fetch(`/api/cv/${cvId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      // Si hay un error, lo mostramos
      if (!response.ok) {
        setError(data.error || "Error al eliminar el CV");
        setLoading(false);
        return;
      }

      // Si todo salió bien, cerramos el modal y refrescamos la página
      setShowModal(false);
      router.refresh(); // Esto recarga la lista de CVs
    } catch (error) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="flex-1 text-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
      >
        Eliminar
      </button>

      {/* Modal de confirmación (solo se muestra si showModal es true) */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            // Cerrar el modal si haces click fuera del contenido
            if (!loading) {
              setShowModal(false);
              setError("");
            }
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer click dentro
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Estás seguro?
            </h3>
            <p className="text-gray-600 mb-4">
              Estás a punto de eliminar el CV: <strong>"{cvTitle}"</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Esta acción no se puede deshacer.
            </p>

            {/* Mensaje de error si hay alguno */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Botones del modal */}
            <div className="flex gap-3 justify-end">
              {/* Botón Cancelar: cierra el modal sin hacer nada */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>

              {/* Botón Eliminar: confirma y elimina el CV */}
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

