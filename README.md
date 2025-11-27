# 📝 CV Maker - Creador de Currículums Profesionales

Aplicación web avanzada para crear currículums vitae (CVs) con múltiples plantillas, editor drag & drop, exportación a PDF y compartir con enlace público.

## 🎯 Características Principales

- ✨ **Múltiples Plantillas**: 5 diseños profesionales diferentes
- 🖱️ **Editor Drag & Drop**: Arrastra y suelta para personalizar tu CV
- 👁️ **Vista Previa en Tiempo Real**: Ve cómo queda tu CV mientras lo editas
- 📄 **Exportación a PDF**: Descarga tu CV en formato PDF profesional
- 🔗 **Compartir con Enlace**: Comparte tu CV con un enlace público único
- 📱 **Diseño Responsive**: Funciona perfectamente en móvil, tablet y desktop
- 🔐 **Autenticación de Usuarios**: Guarda múltiples CVs de forma segura

## 🚀 Tecnologías

- **Next.js 14+** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Prisma** - ORM para gestión de base de datos
- **NextAuth.js** - Autenticación de usuarios
- **Tailwind CSS** - Estilos modernos y responsive
- **@dnd-kit** - Editor drag & drop
- **react-pdf** - Generación de PDFs
- **Playwright** - Testing end-to-end

## 📚 Documentación

Toda la documentación del proyecto está en la carpeta [`/docs`](./docs/):

- 📋 [Plan de Implementación Completo](./docs/PLAN_IMPLEMENTACION.md) - Plan detallado con explicaciones simples, ramas y commits
- 📊 [Resumen Visual del Plan](./docs/RESUMEN_PLAN.md) - Resumen visual con mapa de ramas y estadísticas
- 🔍 [Fuentes de Investigación](./docs/research-sources.md) - Aplicaciones comerciales analizadas y tecnologías

## 🏗️ Estado del Proyecto

**Estado Actual**: 🚧 En desarrollo - Setup inicial

- ✅ Investigación de aplicaciones comerciales
- ✅ Plan de implementación detallado
- ✅ Estructura de ramas y commits definida
- ✅ Proyecto Next.js inicializado
- ⏳ Pendiente: Configuración completa

## 🚀 Empezar

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 📦 Estructura del Proyecto

```
CV-maker/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── (dashboard)/       # Rutas protegidas
│   ├── cv/[slug]/         # Vista pública del CV
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── editor/           # Componentes del editor
│   ├── templates/        # Plantillas de CV
│   └── ui/               # Componentes UI
├── lib/                  # Utilidades y configuraciones
├── prisma/               # Esquema de base de datos
├── types/                # Tipos TypeScript
├── tests/                # Tests con Playwright
└── docs/                 # Documentación del proyecto
```

## 🎨 Plantillas Disponibles

1. **Modern** - Diseño moderno y limpio
2. **Classic** - Diseño tradicional y profesional
3. **Creative** - Diseño creativo y colorido
4. **Minimal** - Diseño minimalista y elegante
5. **Professional** - Optimizado para sistemas ATS

## 🧪 Testing

El proyecto incluye tests automatizados con Playwright para:
- Autenticación (login, registro)
- Dashboard (CRUD de CVs)
- Editor (edición, drag & drop)
- Exportación PDF
- Compartir CVs
- Flujos end-to-end completos

## 📝 Próximos Pasos

1. ✅ Inicializar proyecto Next.js
2. ⏳ Configurar TypeScript y Tailwind CSS
3. ⏳ Crear estructura de carpetas
4. ⏳ Seguir el [Plan de Implementación](./docs/PLAN_IMPLEMENTACION.md)

## 🤝 Contribuir

Este es un proyecto en desarrollo. Consulta la [Guía de Desarrollo](./docs/GUIA_DESARROLLO.md) (próximamente) para más información sobre cómo contribuir.

## 📄 Licencia

[Pendiente de definir]

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
