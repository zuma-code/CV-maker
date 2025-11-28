# 🗺️ Plan de Próximos Pasos - CV Maker (Mejorado)

## 📊 Estado Actual del Proyecto

### ✅ Completado
- ✅ **Setup inicial**: Next.js 14, TypeScript, Tailwind CSS configurados
- ✅ **Base de datos**: Prisma con modelos User y CV (SQLite)
- ✅ **Autenticación**: Login, registro, cierre de sesión con NextAuth v4
- ✅ **Dashboard básico**: Lista de CVs del usuario con diseño responsive

### ⚠️ Parcialmente Completado
- ⚠️ **Dashboard**: Muestra CVs pero falta funcionalidad CRUD completa
  - ❌ Crear nuevo CV (ruta existe pero no funcional)
  - ❌ Eliminar CV (botón existe pero no funcional)
  - ❌ Duplicar CV (no existe)
  - ❌ Editar CV (redirige a `/editor/[id]` pero página no existe)

### ❌ Pendiente
- ❌ **Plantillas**: No hay plantillas de CV implementadas
- ❌ **Editor**: No existe la página/componente de edición
- ❌ **Vista previa**: No hay vista previa del CV
- ❌ **Drag & Drop**: No hay funcionalidad de arrastrar y soltar
- ❌ **Exportar PDF**: No se puede descargar el CV
- ❌ **Compartir**: No se puede compartir CV con enlace público

---

## 🎯 Plan de Implementación Detallado

### **FASE 1: Completar Dashboard** 🏠
**Objetivo**: Permitir que los usuarios gestionen sus CVs (crear, eliminar, duplicar)  
**Tiempo estimado**: 3-4 días  
**Prioridad**: 🔴 Alta

---

#### **Paso 1.1: Página para Crear Nuevo CV**
**Tiempo estimado**: 1 día  
**Dependencias**: Ninguna

##### ¿Qué haremos?
Crear la página `/dashboard/new` donde el usuario puede:
- Elegir una plantilla de CV
- Escribir un título para su CV
- Crear el CV con datos vacíos por defecto en formato JSON

##### Archivos a crear:

```
app/(dashboard)/dashboard/new/
  ├── page.tsx                    # Página de creación
  └── loading.tsx                # Estado de carga

components/dashboard/
  └── CreateCVForm.tsx           # Formulario de creación (client component)

app/api/cv/
  └── create/
      └── route.ts               # API POST para crear CV

lib/
  └── cv-helpers.ts              # Funciones helper (generar slug, datos vacíos)
```

##### Estructura de datos inicial (CVData vacío):

```typescript
const emptyCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: ""
  },
  experience: [],
  education: [],
  skills: [],
  summary: "",
  languages: [],
  certifications: []
};
```

##### Funcionalidad detallada:

1. **Selección de plantilla**:
   - Grid de plantillas disponibles (Modern, Classic, Creative, Minimal, Professional)
   - Preview visual de cada plantilla (placeholder por ahora)
   - Selección con radio buttons o cards clickeables
   - Validación: debe seleccionar una plantilla

2. **Título del CV**:
   - Input de texto con validación
   - Mínimo 3 caracteres, máximo 100
   - Generar slug automáticamente desde el título
   - Validar que el slug sea único para el usuario

3. **Generación de slug**:
   - Función helper: `generateSlug(title: string): string`
   - Convertir a lowercase, reemplazar espacios con guiones
   - Añadir número si ya existe (ej: "mi-cv-2")
   - Verificar unicidad en base de datos

4. **Creación del CV**:
   - POST a `/api/cv/create`
   - Validar sesión del usuario
   - Crear CV con datos vacíos
   - Retornar ID del CV creado
   - Redirigir a `/editor/[id]`

##### Criterios de aceptación:
- ✅ Usuario puede seleccionar una plantilla
- ✅ Usuario puede ingresar un título válido
- ✅ Se genera slug único automáticamente
- ✅ CV se crea en la base de datos con datos vacíos
- ✅ Redirección al editor funciona correctamente
- ✅ Validaciones funcionan (título requerido, plantilla requerida)
- ✅ Manejo de errores (slug duplicado, error de servidor)
- ✅ Loading state durante la creación

##### Tests con Playwright:
- Test: Usuario puede crear un CV nuevo
- Test: Validación de título requerido
- Test: Validación de plantilla requerida
- Test: Slug se genera correctamente
- Test: Redirección al editor después de crear

---

#### **Paso 1.2: Funcionalidad Eliminar CV**
**Tiempo estimado**: 0.5 días  
**Dependencias**: Paso 1.1 (necesita CVs creados)

##### ¿Qué haremos?
- Añadir botón "Eliminar" funcional en cada tarjeta de CV
- Modal de confirmación antes de eliminar
- Actualizar lista sin recargar página completa (optimistic update)

##### Archivos a crear/modificar:

```
components/dashboard/
  └── DeleteCVButton.tsx         # Botón con modal de confirmación (client)

app/api/cv/
  └── [id]/
      └── route.ts               # API DELETE para eliminar CV

app/(dashboard)/dashboard/
  └── page.tsx                   # Actualizar para usar DeleteCVButton
```

##### Funcionalidad detallada:

1. **Botón Eliminar**:
   - Botón en cada tarjeta de CV
   - Icono de basura o texto "Eliminar"
   - Estilo de advertencia (rojo/gris)

2. **Modal de confirmación**:
   - Componente modal reutilizable
   - Mensaje: "¿Estás seguro de que quieres eliminar '[título]'?"
   - Botones: "Cancelar" y "Eliminar"
   - Cerrar con ESC o click fuera

3. **Eliminación**:
   - DELETE a `/api/cv/[id]`
   - Verificar que el CV pertenece al usuario
   - Eliminar de la base de datos
   - Retornar éxito/error

4. **Actualización de UI**:
   - Optimistic update: remover de la lista inmediatamente
   - Si falla, restaurar y mostrar error
   - Toast/notificación de éxito

##### Criterios de aceptación:
- ✅ Botón eliminar visible en cada CV
- ✅ Modal de confirmación se muestra al hacer click
- ✅ CV se elimina de la base de datos
- ✅ Lista se actualiza sin recargar página
- ✅ Verificación de propiedad (no puede eliminar CVs de otros)
- ✅ Manejo de errores (CV no encontrado, error de servidor)
- ✅ Feedback visual (loading, éxito, error)

##### Tests con Playwright:
- Test: Usuario puede eliminar su CV
- Test: Modal de confirmación aparece
- Test: Cancelar no elimina el CV
- Test: No puede eliminar CV de otro usuario
- Test: Lista se actualiza después de eliminar

---

#### **Paso 1.3: Funcionalidad Duplicar CV**
**Tiempo estimado**: 0.5 días  
**Dependencias**: Paso 1.1

##### ¿Qué haremos?
- Añadir botón "Duplicar" en cada tarjeta
- Crear copia del CV con nuevo título y slug
- Mantener todos los datos del CV original

##### Archivos a crear/modificar:

```
components/dashboard/
  └── DuplicateCVButton.tsx      # Botón de duplicar (client)

app/api/cv/
  └── [id]/
      └── duplicate/
          └── route.ts           # API POST para duplicar CV

app/(dashboard)/dashboard/
  └── page.tsx                   # Añadir botón Duplicar
```

##### Funcionalidad detallada:

1. **Botón Duplicar**:
   - Botón en cada tarjeta
   - Icono de copiar o texto "Duplicar"

2. **Duplicación**:
   - POST a `/api/cv/[id]/duplicate`
   - Verificar propiedad del CV
   - Copiar todos los datos del CV original
   - Generar nuevo slug único
   - Título: "Copia de [título original]" o "[título original] (Copia)"
   - Crear nuevo CV en la base de datos

3. **Redirección**:
   - Redirigir al editor del nuevo CV
   - O mostrar mensaje de éxito y actualizar lista

##### Criterios de aceptación:
- ✅ Botón duplicar visible en cada CV
- ✅ CV se duplica con todos los datos
- ✅ Nuevo slug único se genera
- ✅ Título indica que es una copia
- ✅ Redirección al editor del nuevo CV funciona
- ✅ Verificación de propiedad
- ✅ Manejo de errores

##### Tests con Playwright:
- Test: Usuario puede duplicar su CV
- Test: CV duplicado tiene todos los datos originales
- Test: Nuevo slug es único
- Test: Redirección al editor funciona

---

### **FASE 2: Crear Plantillas Básicas** 🎨
**Objetivo**: Tener al menos 2 plantillas funcionando para que los usuarios puedan elegir  
**Tiempo estimado**: 2-3 días  
**Prioridad**: 🔴 Alta

---

#### **Paso 2.1: Estructura Base de Plantillas**
**Tiempo estimado**: 0.5 días  
**Dependencias**: Ninguna

##### ¿Qué haremos?
- Crear estructura de carpetas para plantillas
- Componente base reutilizable con props tipadas
- Sistema de tipos para plantillas
- Helper para renderizar plantilla según nombre

##### Archivos a crear:

```
components/templates/
  ├── TemplateBase.tsx           # Componente base con estilos comunes
  ├── TemplateRenderer.tsx       # Renderiza plantilla según nombre
  ├── index.ts                   # Exportar todas las plantillas
  └── sections/                  # Secciones reutilizables
      ├── PersonalInfoSection.tsx
      ├── ExperienceSection.tsx
      ├── EducationSection.tsx
      └── SkillsSection.tsx

lib/
  └── template-helpers.ts        # Funciones helper para plantillas
```

##### Estructura del componente base:

```typescript
interface TemplateBaseProps {
  data: CVData;
  className?: string;
}

export function TemplateBase({ data, className }: TemplateBaseProps) {
  // Estilos comunes, layout base
  // Renderizar secciones usando componentes de sections/
}
```

##### Funcionalidad:

1. **TemplateRenderer**:
   - Recibe `templateName` y `data`
   - Switch/case para renderizar plantilla correcta
   - Fallback a plantilla por defecto si no existe

2. **Secciones reutilizables**:
   - Componentes para cada sección (PersonalInfo, Experience, etc.)
   - Props tipadas con CVData
   - Estilos configurables

##### Criterios de aceptación:
- ✅ Estructura de carpetas creada
- ✅ Componente base funciona
- ✅ TemplateRenderer renderiza plantillas
- ✅ Secciones reutilizables funcionan
- ✅ Tipos TypeScript correctos

---

#### **Paso 2.2: Plantilla Modern (Primera)**
**Tiempo estimado**: 1 día  
**Dependencias**: Paso 2.1

##### ¿Qué haremos?
- Crear plantilla con diseño moderno y colorido
- Usar colores vibrantes, secciones bien definidas
- Diseño limpio y profesional

##### Archivos a crear:

```
components/templates/
  └── ModernTemplate.tsx         # Plantilla Modern completa
```

##### Características de diseño:

1. **Colores**:
   - Header: Gradiente azul (#3B82F6) a verde (#10B981)
   - Texto principal: Gris oscuro (#1F2937)
   - Acentos: Azul (#3B82F6)
   - Fondo: Blanco con sombras sutiles

2. **Layout**:
   - Header con nombre grande y destacado
   - Información de contacto en una línea
   - Secciones con iconos (opcional)
   - Espaciado generoso
   - Bordes redondeados

3. **Tipografía**:
   - Títulos: Inter o Poppins (sans-serif moderna)
   - Cuerpo: System font stack
   - Tamaños: Responsive

4. **Secciones**:
   - Personal Info: Header destacado
   - Experience: Lista con fechas a la izquierda
   - Education: Similar a Experience
   - Skills: Tags o lista con niveles

##### Estructura del componente:

```typescript
export function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div className="modern-template">
      <header>
        <h1>{data.personalInfo.fullName}</h1>
        <div className="contact-info">
          {/* Email, teléfono, ubicación, redes */}
        </div>
      </header>
      <section className="summary">
        {data.summary && <p>{data.summary}</p>}
      </section>
      <ExperienceSection experiences={data.experience} />
      <EducationSection education={data.education} />
      <SkillsSection skills={data.skills} />
    </div>
  );
}
```

##### Criterios de aceptación:
- ✅ Plantilla se renderiza correctamente
- ✅ Todos los datos se muestran
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Colores y tipografía aplicados
- ✅ Secciones bien organizadas
- ✅ Manejo de datos vacíos (no rompe si falta información)

##### Tests con Playwright:
- Test: Plantilla Modern se renderiza
- Test: Todos los datos se muestran correctamente
- Test: Responsive en diferentes tamaños de pantalla

---

#### **Paso 2.3: Plantilla Classic (Segunda)**
**Tiempo estimado**: 1 día  
**Dependencias**: Paso 2.1

##### ¿Qué haremos?
- Crear plantilla tradicional y conservadora
- Diseño más formal, colores neutros
- Ideal para trabajos corporativos

##### Archivos a crear:

```
components/templates/
  └── ClassicTemplate.tsx         # Plantilla Classic completa
```

##### Características de diseño:

1. **Colores**:
   - Header: Negro (#000000) o gris muy oscuro (#1F2937)
   - Texto: Gris oscuro (#374151)
   - Acentos: Gris medio (#6B7280)
   - Fondo: Blanco puro

2. **Layout**:
   - Diseño más estructurado y formal
   - Líneas divisorias entre secciones
   - Menos espacio en blanco que Modern
   - Layout de dos columnas opcional

3. **Tipografía**:
   - Títulos: Georgia o Times (serif clásica)
   - Cuerpo: System serif o sans-serif
   - Tamaños más conservadores

4. **Secciones**:
   - Más tradicionales
   - Menos elementos decorativos
   - Enfoque en contenido

##### Criterios de aceptación:
- ✅ Mismos que Modern Template
- ✅ Diseño más conservador y formal
- ✅ Colores neutros aplicados

---

### **FASE 3: Editor Básico** ✏️
**Objetivo**: Permitir editar la información del CV con formularios  
**Tiempo estimado**: 4-5 días  
**Prioridad**: 🔴 Alta

---

#### **Paso 3.1: Página del Editor**
**Tiempo estimado**: 1 día  
**Dependencias**: Fase 1 (crear CV), Fase 2 (plantillas)

##### ¿Qué haremos?
- Crear página `/editor/[id]` que carga el CV
- Layout con formulario a la izquierda y vista previa a la derecha
- Cargar datos del CV desde la base de datos
- Verificar propiedad del CV

##### Archivos a crear:

```
app/(dashboard)/editor/
  └── [id]/
      ├── page.tsx               # Página del editor (server component)
      ├── loading.tsx            # Estado de carga
      └── error.tsx              # Error boundary

components/editor/
  ├── EditorLayout.tsx           # Layout del editor (client)
  ├── EditorSidebar.tsx          # Sidebar con formularios
  └── PreviewPanel.tsx           # Panel de vista previa

app/api/cv/
  └── [id]/
      └── route.ts               # API GET para obtener CV
```

##### Layout del editor:

```
┌─────────────────────────────────────────┐
│ Header (título, guardar, exportar)     │
├──────────────┬──────────────────────────┤
│              │                          │
│  Formulario  │   Vista Previa          │
│  (izquierda) │   (derecha)             │
│              │                          │
│  - Personal  │   [CV Renderizado]      │
│  - Experience│                          │
│  - Education │                          │
│  - Skills    │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

##### Funcionalidad:

1. **Cargar CV**:
   - GET `/api/cv/[id]`
   - Verificar que el CV pertenece al usuario
   - Retornar datos del CV o 404/403

2. **Layout responsive**:
   - Desktop: Formulario izquierda, preview derecha
   - Tablet: Tabs o toggle entre formulario y preview
   - Móvil: Stack vertical con toggle

3. **Estado del editor**:
   - Estado local con datos del CV
   - Sincronización con vista previa
   - Indicador de cambios no guardados

##### Criterios de aceptación:
- ✅ Página carga el CV correcto
- ✅ Verificación de propiedad funciona
- ✅ Layout responsive funciona
- ✅ Datos se cargan correctamente
- ✅ Manejo de errores (CV no encontrado, sin permisos)
- ✅ Loading state durante carga

##### Tests con Playwright:
- Test: Editor carga CV correcto
- Test: No puede acceder a CV de otro usuario
- Test: Layout responsive funciona
- Test: Datos se muestran en formulario

---

#### **Paso 3.2: Formulario de Información Personal**
**Tiempo estimado**: 1 día  
**Dependencias**: Paso 3.1

##### ¿Qué haremos?
- Formulario para editar datos personales
- Campos: nombre, email, teléfono, ubicación, redes sociales
- Validación en tiempo real
- Guardado automático o con botón

##### Archivos a crear:

```
components/editor/
  └── sections/
      ├── PersonalInfoForm.tsx   # Formulario completo
      └── FormField.tsx          # Campo reutilizable

app/api/cv/
  └── [id]/
      └── update/
          └── route.ts           # API PATCH para actualizar CV
```

##### Campos del formulario:

1. **Información básica**:
   - Nombre completo (required, min 2 caracteres)
   - Email (required, validación de formato)
   - Teléfono (opcional, validación de formato)
   - Ubicación (opcional)

2. **Redes sociales** (opcionales):
   - Website
   - LinkedIn
   - GitHub

3. **Resumen profesional**:
   - Textarea para summary (opcional, max 500 caracteres)

##### Validaciones:

- Email: Formato válido (regex)
- Teléfono: Formato válido (opcional)
- URLs: Formato válido si se proporcionan
- Nombre: Requerido, mínimo 2 caracteres

##### Guardado:

- Opción 1: Guardado automático después de 2 segundos sin cambios (debounce)
- Opción 2: Botón "Guardar" manual
- Mostrar indicador de guardado (guardando... / guardado ✓)

##### Criterios de aceptación:
- ✅ Todos los campos se muestran
- ✅ Validaciones funcionan en tiempo real
- ✅ Datos se guardan correctamente
- ✅ Vista previa se actualiza en tiempo real
- ✅ Indicadores de guardado funcionan
- ✅ Manejo de errores de validación

##### Tests con Playwright:
- Test: Campos se pueden editar
- Test: Validaciones funcionan
- Test: Datos se guardan
- Test: Vista previa se actualiza

---

#### **Paso 3.3: Formularios de Experiencia y Educación**
**Tiempo estimado**: 1.5 días  
**Dependencias**: Paso 3.2

##### ¿Qué haremos?
- Formularios para añadir/editar experiencias laborales
- Formularios para añadir/editar educación
- Botones para añadir/eliminar elementos
- Validación de fechas

##### Archivos a crear:

```
components/editor/
  └── sections/
      ├── ExperienceForm.tsx     # Lista y formulario de experiencias
      ├── ExperienceItem.tsx     # Item individual editable
      ├── EducationForm.tsx      # Lista y formulario de educación
      └── EducationItem.tsx      # Item individual editable
```

##### Estructura de ExperienceItem:

```typescript
interface ExperienceItemProps {
  experience: Experience;
  onUpdate: (experience: Experience) => void;
  onDelete: () => void;
  index: number;
}
```

##### Campos de Experience:

- Empresa (required)
- Posición/Cargo (required)
- Fecha inicio (required, date picker)
- Fecha fin (opcional, o checkbox "Trabajo actual")
- Descripción (textarea, opcional)
- Checkbox "Trabajo actual"

##### Campos de Education:

- Institución (required)
- Título/Grado (required)
- Campo de estudio (opcional)
- Fecha inicio (required)
- Fecha fin (opcional, o checkbox "En curso")
- Checkbox "En curso"

##### Funcionalidad:

1. **Añadir nuevo**:
   - Botón "+ Añadir Experiencia/Educación"
   - Formulario inline o modal
   - Generar ID único para el item

2. **Editar existente**:
   - Click en item para editar
   - Formulario inline
   - Guardar cambios

3. **Eliminar**:
   - Botón eliminar en cada item
   - Confirmación rápida (opcional)
   - Remover de la lista

4. **Validaciones**:
   - Fecha fin debe ser después de fecha inicio
   - Si "Trabajo actual", fecha fin debe ser null
   - Campos requeridos

##### Criterios de aceptación:
- ✅ Añadir nueva experiencia/educación funciona
- ✅ Editar existente funciona
- ✅ Eliminar funciona
- ✅ Validaciones de fechas funcionan
- ✅ Checkbox "Trabajo actual/En curso" funciona
- ✅ Datos se guardan correctamente
- ✅ Vista previa se actualiza

##### Tests con Playwright:
- Test: Añadir experiencia funciona
- Test: Editar experiencia funciona
- Test: Eliminar experiencia funciona
- Test: Validaciones de fechas funcionan

---

#### **Paso 3.4: Formulario de Habilidades**
**Tiempo estimado**: 0.5 días  
**Dependencias**: Paso 3.3

##### ¿Qué haremos?
- Formulario para gestionar habilidades
- Añadir/eliminar habilidades
- Niveles opcionales (principiante, intermedio, avanzado, experto)

##### Archivos a crear:

```
components/editor/
  └── sections/
      ├── SkillsForm.tsx         # Lista y formulario de habilidades
      └── SkillItem.tsx         # Item individual
```

##### Campos de Skill:

- Nombre de habilidad (required)
- Nivel (opcional): dropdown con opciones
  - Principiante
  - Intermedio
  - Avanzado
  - Experto

##### Funcionalidad:

1. **Añadir habilidad**:
   - Input con autocompletado (opcional)
   - Botón "+" o Enter para añadir
   - Generar ID único

2. **Eliminar habilidad**:
   - Botón X en cada item
   - Eliminación inmediata

3. **Editar nivel**:
   - Dropdown en cada item
   - Actualización automática

##### Criterios de aceptación:
- ✅ Añadir habilidades funciona
- ✅ Eliminar habilidades funciona
- ✅ Niveles se pueden seleccionar
- ✅ Datos se guardan correctamente
- ✅ Vista previa se actualiza

---

### **FASE 4: Vista Previa en Tiempo Real** 👁️
**Objetivo**: Ver cómo queda el CV mientras se edita  
**Tiempo estimado**: 1-2 días  
**Prioridad**: 🟡 Media

---

#### **Paso 4.1: Componente de Vista Previa**
**Tiempo estimado**: 1-2 días  
**Dependencias**: Fase 2 (plantillas), Fase 3 (editor)

##### ¿Qué haremos?
- Componente que muestra el CV usando la plantilla seleccionada
- Sincronización automática con los datos del formulario
- Actualización en tiempo real
- Scroll independiente del formulario

##### Archivos a crear/modificar:

```
components/editor/
  └── PreviewPanel.tsx           # Panel de vista previa completo

lib/
  └── template-helpers.ts        # Función para renderizar plantilla correcta
```

##### Funcionalidad:

1. **Renderizado de plantilla**:
   - Usar `TemplateRenderer` del Paso 2.1
   - Pasar datos actuales del CV
   - Renderizar según `cv.template`

2. **Sincronización**:
   - Usar estado compartido entre formulario y preview
   - Actualizar preview cuando cambian los datos
   - Debounce opcional para rendimiento

3. **Scroll independiente**:
   - Preview tiene su propio scroll
   - No afecta el scroll del formulario

4. **Toggle móvil**:
   - En móvil, toggle entre formulario y preview
   - Botón "Ver Preview" / "Editar"

5. **Zoom/Scale**:
   - Opción para ajustar tamaño del preview
   - Útil para ver cómo se verá impreso

##### Criterios de aceptación:
- ✅ Preview muestra CV con plantilla correcta
- ✅ Actualización en tiempo real funciona
- ✅ Scroll independiente funciona
- ✅ Toggle móvil funciona
- ✅ Rendimiento aceptable (no lag)

##### Tests con Playwright:
- Test: Preview se muestra correctamente
- Test: Actualización en tiempo real funciona
- Test: Toggle móvil funciona

---

### **FASE 5: Funcionalidades Avanzadas** 🚀
**Objetivo**: Mejorar la experiencia con características avanzadas  
**Tiempo estimado**: 5-7 días  
**Prioridad**: 🟢 Baja (después de las fases anteriores)

---

#### **Paso 5.1: Drag & Drop (Reordenar Secciones)**
**Tiempo estimado**: 2 días  
**Dependencias**: Fase 3 (editor)

##### ¿Qué haremos?
- Permitir reordenar secciones del CV arrastrando
- Usar librería @dnd-kit (moderna y accesible)
- Guardar orden personalizado en CVData

##### Archivos a crear:

```
components/editor/
  └── DragDropProvider.tsx       # Provider de drag & drop

lib/
  └── dnd-helpers.ts             # Funciones helper para drag & drop
```

##### Dependencia a instalar:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

##### Funcionalidad:

1. **Reordenar secciones**:
   - Arrastrar secciones (Experience, Education, Skills)
   - Visual feedback durante el arrastre
   - Guardar nuevo orden

2. **Reordenar items dentro de secciones**:
   - Reordenar experiencias individuales
   - Reordenar items de educación
   - Reordenar habilidades

##### Criterios de aceptación:
- ✅ Secciones se pueden reordenar
- ✅ Items se pueden reordenar
- ✅ Orden se guarda correctamente
- ✅ Visual feedback funciona
- ✅ Accesible (teclado funciona)

---

#### **Paso 5.2: Exportar a PDF**
**Tiempo estimado**: 2 días  
**Dependencias**: Fase 2 (plantillas), Fase 4 (vista previa)

##### ¿Qué haremos?
- Generar PDF del CV usando react-pdf o jsPDF
- Botón "Descargar PDF" en el editor
- Optimizar plantillas para PDF

##### Opciones de librería:

1. **react-pdf** (recomendado):
   - Más control sobre el diseño
   - Mejor para documentos complejos
   - Requiere adaptar componentes

2. **jsPDF + html2canvas**:
   - Más fácil de implementar
   - Captura el HTML renderizado
   - Menos control sobre el diseño

##### Archivos a crear:

```
lib/
  └── pdf-generator.ts           # Función para generar PDF

components/editor/
  └── ExportPDFButton.tsx       # Botón de exportar
```

##### Funcionalidad:

1. **Generación de PDF**:
   - Renderizar CV con plantilla
   - Convertir a PDF
   - Descargar archivo

2. **Optimización**:
   - Ajustar estilos para impresión
   - Manejar paginación
   - Asegurar que todo se vea bien

##### Criterios de aceptación:
- ✅ PDF se genera correctamente
- ✅ Diseño se mantiene en PDF
- ✅ Descarga funciona
- ✅ PDF es legible y profesional

---

#### **Paso 5.3: Compartir CV con Enlace Público**
**Tiempo estimado**: 1-2 días  
**Dependencias**: Fase 2 (plantillas)

##### ¿Qué haremos?
- Permitir hacer CV público
- Generar enlace único para compartir
- Página pública para ver CV sin login

##### Archivos a crear:

```
app/cv/
  └── [publicSlug]/
      └── page.tsx               # Página pública del CV

app/api/cv/
  └── [id]/
      └── public/
          └── route.ts           # API para hacer público/privado

components/editor/
  └── ShareButton.tsx            # Botón para compartir
```

##### Funcionalidad:

1. **Hacer público**:
   - Toggle en el editor
   - Generar `publicSlug` único
   - Guardar en base de datos

2. **Página pública**:
   - Ruta: `/cv/[publicSlug]`
   - Renderizar CV sin autenticación
   - No mostrar botones de edición

3. **Compartir**:
   - Botón "Copiar enlace"
   - Compartir en redes sociales (opcional)

##### Criterios de aceptación:
- ✅ CV se puede hacer público
- ✅ Enlace único se genera
- ✅ Página pública funciona
- ✅ No requiere autenticación
- ✅ Enlace se puede copiar

---

## 📅 Roadmap Visual

```
Semana 1: FASE 1 - Completar Dashboard
├── Día 1-2: Crear nuevo CV
├── Día 3: Eliminar CV
└── Día 4: Duplicar CV

Semana 2: FASE 2 - Plantillas Básicas
├── Día 1: Estructura base
├── Día 2-3: Plantilla Modern
└── Día 4: Plantilla Classic

Semana 3-4: FASE 3 - Editor Básico
├── Día 1: Página del editor
├── Día 2: Formulario personal
├── Día 3-4: Formularios experiencia/educación
└── Día 5: Formulario habilidades

Semana 5: FASE 4 - Vista Previa
└── Día 1-2: Componente vista previa

Semana 6-7: FASE 5 - Funcionalidades Avanzadas
├── Día 1-2: Drag & Drop
├── Día 3-4: Exportar PDF
└── Día 5-6: Compartir CV
```

---

## 🎯 Prioridad de Implementación

### **🔴 Alta Prioridad** (MVP - Hacer primero)
1. ✅ **FASE 1**: Completar Dashboard (crear, eliminar, duplicar)
2. ✅ **FASE 2**: Plantillas básicas (al menos 2: Modern y Classic)
3. ✅ **FASE 3**: Editor básico con formularios
4. ✅ **FASE 4**: Vista previa en tiempo real

**Resultado**: Aplicación funcional donde usuarios pueden crear, editar y ver CVs

### **🟡 Media Prioridad** (Mejoras importantes)
5. ✅ **FASE 5.1**: Drag & Drop
6. ✅ **FASE 5.2**: Exportar PDF
7. ✅ **FASE 2**: Más plantillas (Creative, Minimal, Professional)

**Resultado**: Aplicación con características avanzadas

### **🟢 Baja Prioridad** (Nice to have)
8. ✅ **FASE 5.3**: Compartir CV público
9. ✅ Optimizaciones y mejoras UX
10. ✅ Analytics y métricas

---

## 📝 Consideraciones Técnicas Importantes

### **Guardado de Datos**
- **Estrategia**: Guardado automático con debounce (2 segundos)
- **Indicadores**: Mostrar "Guardando..." y "Guardado ✓"
- **Manejo de errores**: Reintentar automáticamente si falla

### **Validación**
- **Cliente**: Validación en tiempo real con feedback visual
- **Servidor**: Validación adicional en API routes
- **Mensajes**: Mensajes de error claros y específicos

### **Rendimiento**
- **Optimistic updates**: Actualizar UI antes de confirmar con servidor
- **Debounce**: Para inputs y guardado automático
- **Lazy loading**: Cargar plantillas solo cuando se necesiten
- **Memoización**: Usar React.memo y useMemo donde sea necesario

### **Responsive Design**
- **Breakpoints**: 
  - Móvil: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Estrategia**: Mobile-first approach
- **Testing**: Probar en diferentes dispositivos

### **Testing**
- **Playwright**: Tests E2E para cada funcionalidad
- **Cobertura**: Al menos 70% de código crítico
- **Tests a incluir**:
  - Flujos completos de usuario
  - Validaciones
  - Manejo de errores
  - Responsive design

### **Accesibilidad**
- **ARIA labels**: Para elementos interactivos
- **Navegación por teclado**: Todas las funciones accesibles
- **Contraste**: Cumplir WCAG AA mínimo
- **Screen readers**: Probar con lectores de pantalla

---

## 🚀 Próximo Paso Inmediato

**Recomendación**: Empezar con **FASE 1 - Paso 1.1: Crear Nuevo CV**

**Por qué**:
- ✅ Es la base para todo lo demás
- ✅ Permite probar la integración completa
- ✅ Establece el flujo: crear → editar → ver
- ✅ Relativamente simple pero importante

**Archivos a crear primero**:
1. `lib/cv-helpers.ts` - Funciones helper (generar slug, datos vacíos)
2. `app/api/cv/create/route.ts` - API para crear CV
3. `components/dashboard/CreateCVForm.tsx` - Formulario
4. `app/(dashboard)/dashboard/new/page.tsx` - Página

¿Empezamos con la implementación? 🎉
