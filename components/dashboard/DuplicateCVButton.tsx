"use client";

/**
 * Botón para duplicar un CV
 * 
 * Este componente muestra un botón "Duplicar" que:
 * 1. Al hacer click, duplica el CV con todos sus datos
 * 2. Genera un nuevo título (añade "Copia de" al inicio)
 * 3. Genera un nuevo slug único
 * 4. Actualiza la lista automáticamente
 * 
 * Es un "client component" porque necesita interactividad
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DuplicateCVButtonProps {
  cvId: string;
  cvTitle: string;
}

export default function DuplicateCVButton({ cvId, cvTitle }: DuplicateCVButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Controla si está procesando
  const [error, setError] = useState(""); // Para mostrar errores
  const [success, setSuccess] = useState(false); // Para mostrar éxito

  // Esta función se ejecuta cuando haces click en "Duplicar"
  const handleDuplicate = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Enviamos una petición POST al servidor para duplicar el CV
      const response = await fetch(`/api/cv/${cvId}/duplicate`, {
        method: "POST",
      });

      const data = await response.json();

      // Si hay un error, lo mostramos
      if (!response.ok) {
        setError(data.error || "Error al duplicar el CV");
        setLoading(false);
        return;
      }

      // Si todo salió bien, mostramos éxito y refrescamos la página
      setSuccess(true);
      setLoading(false); // Resetear loading antes del refresh
      router.refresh(); // Esto recarga la lista de CVs

      // Ocultar el mensaje de éxito después de 2 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Botón de duplicar */}
      <button
        onClick={handleDuplicate}
        disabled={loading}
        className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Duplicando..." : "Duplicar"}
      </button>

      {/* Mensaje de éxito (aparece brevemente) */}
      {success && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm z-10">
          ✓ CV duplicado correctamente
        </div>
      )}

      {/* Mensaje de error (si hay alguno) */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm z-10">
          {error}
        </div>
      )}
    </div>
  );
}

