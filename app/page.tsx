import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CV Maker
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Crea tu currículum vitae profesional con múltiples plantillas y diseños
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Crear Cuenta
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Iniciar Sesión
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">✨ Múltiples Plantillas</h3>
            <p className="text-gray-600 text-sm">Elige entre 5 diseños profesionales</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🖱️ Editor Drag & Drop</h3>
            <p className="text-gray-600 text-sm">Personaliza tu CV arrastrando elementos</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">📄 Exporta a PDF</h3>
            <p className="text-gray-600 text-sm">Descarga tu CV en formato PDF</p>
          </div>
        </div>
      </div>
    </main>
  );
}

