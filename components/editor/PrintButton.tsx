"use client";

/**
 * Botón de Impresión
 * 
 * Componente cliente que permite imprimir el CV
 * Usa window.print() para abrir el diálogo de impresión del navegador
 */

interface PrintButtonProps {
  className?: string;
}

export default function PrintButton({ className = "" }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm ${className}`}
    >
      🖨️ Imprimir
    </button>
  );
}



