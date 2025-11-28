/**
 * Página para crear un nuevo CV
 * 
 * Esta es la página que se muestra cuando el usuario hace click en
 * "Crear Nuevo CV" en el dashboard
 * 
 * Ruta: /dashboard/new
 */

import CreateCVForm from "@/components/dashboard/CreateCVForm";

export const metadata = {
  title: "Crear Nuevo CV - CV Maker",
  description: "Crea un nuevo currículum vitae",
};

export default function CreateCVPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header igual que el dashboard */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">CV Maker</h1>
        </div>
      </header>

      {/* Contenido principal: el formulario */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateCVForm />
      </main>
    </div>
  );
}

