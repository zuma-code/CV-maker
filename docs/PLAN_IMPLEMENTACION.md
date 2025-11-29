# 📋 Plan de Implementación: CV Maker Avanzado

## 🎯 Objetivo del Proyecto

Crear una aplicación web donde las personas puedan crear su currículum vitae (CV) de forma fácil y profesional. La aplicación permitirá:
- Crear múltiples CVs con diferentes diseños (plantillas)
- Editar el CV arrastrando y soltando elementos
- Ver cómo quedará el CV mientras lo editas
- Descargar el CV en formato PDF
- Compartir el CV con un enlace público

---

## 🌳 Estructura de Ramas y Commits

Vamos a trabajar con **ramas de Git** (como carpetas separadas para cada funcionalidad) y **commits** (guardados de progreso). Cada rama representa una funcionalidad completa.

---

## 📦 RAMA 1: `setup/inicial` - Preparar el Proyecto

**¿Qué hacemos aquí?** 
Preparamos la "casa" donde vivirá nuestra aplicación. Es como construir los cimientos antes de construir las paredes.

### Commit 1.1: Inicializar proyecto Next.js
**Explicación simple:** 
Instalamos Next.js (el framework que usaremos) y configuramos la estructura básica del proyecto. Es como comprar los materiales de construcción.

**Archivos a crear:**
- `package.json` - Lista de herramientas que usaremos
- `next.config.js` - Configuración de Next.js
- `tsconfig.json` - Configuración de TypeScript
- Estructura de carpetas básica

**Tests con Playwright:**
- Verificar que la página principal carga correctamente
- Verificar que no hay errores en consola

---

### Commit 1.2: Configurar TypeScript y Tailwind CSS
**Explicación simple:** 
TypeScript nos ayuda a evitar errores (como un corrector ortográfico para código). Tailwind CSS nos ayuda a hacer la aplicación bonita sin escribir mucho CSS.

**Archivos a crear/modificar:**
- `tailwind.config.js` - Configuración de estilos
- `postcss.config.js` - Procesador de CSS
- Tipos TypeScript básicos

**Tests con Playwright:**
- Verificar que los estilos se aplican correctamente
- Verificar que no hay errores de TypeScript

---

### Commit 1.3: Crear estructura de carpetas y layout básico
**Explicación simple:** 
Organizamos las "habitaciones" de nuestra aplicación. Creamos las carpetas donde irá cada parte del código.

**Estructura:**
```
app/
  layout.tsx (estructura general)
  page.tsx (página principal)
components/
lib/
types/
```

**Tests con Playwright:**
- Verificar que el layout se renderiza
- Verificar navegación básica

---

## 📦 RAMA 2: `feature/base-datos` - Configurar Base de Datos

**¿Qué hacemos aquí?**
Configuramos el "almacén" donde guardaremos todos los CVs y datos de usuarios. Es como instalar un sistema de archivos inteligente.

### Commit 2.1: Instalar y configurar Prisma
**Explicación simple:** 
Prisma es una herramienta que nos ayuda a hablar con la base de datos de forma fácil. Es como un traductor entre nuestro código y la base de datos.

**Archivos a crear:**
- `prisma/schema.prisma` - Define la estructura de datos
- `lib/db.ts` - Conexión a la base de datos

**Tests con Playwright:**
- Verificar que la conexión a la base de datos funciona
- Verificar que no hay errores de conexión

---

### Commit 2.2: Crear esquema de base de datos (User y CV)
**Explicación simple:** 
Definimos qué información guardaremos. Es como diseñar un formulario: decidimos qué campos necesitamos (nombre, email, etc.).

**Modelos a crear:**
- **User**: Información del usuario (email, nombre, contraseña)
- **CV**: Información de cada CV (título, diseño usado, datos del CV, etc.)

**Archivos:**
- `prisma/schema.prisma` - Modelos User y CV

**Tests con Playwright:**
- Verificar que los modelos se crean correctamente
- Verificar migraciones de base de datos

---

### Commit 2.3: Ejecutar migraciones y crear seed data
**Explicación simple:** 
Aplicamos los cambios a la base de datos (como construir las tablas) y añadimos datos de ejemplo para probar.

**Archivos:**
- `prisma/migrations/` - Cambios en la base de datos
- `prisma/seed.ts` - Datos de ejemplo

**Tests con Playwright:**
- Verificar que las tablas existen
- Verificar que los datos de ejemplo se crean

---

## 📦 RAMA 3: `feature/autenticacion` - Sistema de Login y Registro

**¿Qué hacemos aquí?**
Creamos el sistema para que los usuarios puedan registrarse e iniciar sesión. Es como poner una puerta con llave en nuestra casa.

### Commit 3.1: Instalar y configurar NextAuth.js
**Explicación simple:** 
NextAuth es una herramienta que maneja todo lo relacionado con usuarios: registro, login, sesiones. Es como un portero que verifica quién puede entrar.

**Archivos a crear:**
- `app/api/auth/[...nextauth]/route.ts` - Configuración de autenticación
- `lib/auth.ts` - Configuración de NextAuth

**Tests con Playwright:**
- Verificar que la ruta de autenticación existe
- Verificar que no hay errores de configuración

---

### Commit 3.2: Crear página de registro
**Explicación simple:** 
Creamos el formulario donde las personas se registran (crean su cuenta). Es como un formulario de inscripción.

**Archivos:**
- `app/(auth)/register/page.tsx` - Página de registro
- `components/auth/RegisterForm.tsx` - Formulario de registro

**Tests con Playwright:**
- Verificar que el formulario se muestra
- Verificar que se puede escribir en los campos
- Verificar que el botón de registro funciona
- Verificar validación de campos (email válido, contraseña segura)
- Verificar mensajes de error

---

### Commit 3.3: Crear página de login
**Explicación simple:** 
Creamos el formulario donde las personas inician sesión (entran con su cuenta). Es como el formulario de login de cualquier app.

**Archivos:**
- `app/(auth)/login/page.tsx` - Página de login
- `components/auth/LoginForm.tsx` - Formulario de login

**Tests con Playwright:**
- Verificar que el formulario se muestra
- Verificar login exitoso con credenciales válidas
- Verificar error con credenciales inválidas
- Verificar redirección después del login

---

### Commit 3.4: Proteger rutas del dashboard
**Explicación simple:** 
Aseguramos que solo usuarios que hayan iniciado sesión puedan ver sus CVs. Es como poner un guardia que verifica el pase antes de entrar.

**Archivos:**
- `middleware.ts` - Protección de rutas
- Modificar `app/(dashboard)/layout.tsx` - Verificar sesión

**Tests con Playwright:**
- Verificar que usuarios no autenticados son redirigidos
- Verificar que usuarios autenticados pueden acceder
- Verificar que la sesión persiste al recargar

---

## 📦 RAMA 4: `feature/dashboard` - Panel Principal de CVs

**¿Qué hacemos aquí?**
Creamos la página principal donde el usuario ve todos sus CVs y puede crear nuevos. Es como el escritorio de tu computadora donde ves todos tus archivos.

### Commit 4.1: Crear layout del dashboard
**Explicación simple:** 
Creamos la estructura básica del panel: barra de navegación, menú lateral, área principal. Es como diseñar el layout de una oficina.

**Archivos:**
- `app/(dashboard)/layout.tsx` - Layout del dashboard
- `components/dashboard/Sidebar.tsx` - Menú lateral
- `components/dashboard/Header.tsx` - Barra superior

**Tests con Playwright:**
- Verificar que el layout se muestra correctamente
- Verificar que la navegación funciona
- Verificar responsive en móvil

---

### Commit 4.2: Crear página de lista de CVs
**Explicación simple:** 
Mostramos todos los CVs del usuario en tarjetas (cards). Cada tarjeta muestra el título del CV y botones para editar/eliminar. Es como ver tus documentos en una carpeta.

**Archivos:**
- `app/(dashboard)/dashboard/page.tsx` - Página principal
- `components/dashboard/CVCard.tsx` - Tarjeta individual de CV
- `components/dashboard/CVList.tsx` - Lista de CVs

**Tests con Playwright:**
- Verificar que se muestran los CVs del usuario
- Verificar que aparece mensaje cuando no hay CVs
- Verificar que las tarjetas se muestran correctamente
- Verificar responsive design

---

### Commit 4.3: Implementar crear nuevo CV
**Explicación simple:** 
Añadimos un botón "Crear nuevo CV" que lleva al usuario a elegir una plantilla. Es como el botón "Nuevo documento" en Word.

**Archivos:**
- Modificar `app/(dashboard)/dashboard/page.tsx`
- `app/api/cv/route.ts` - API para crear CV
- `components/dashboard/CreateCVButton.tsx`

**Tests con Playwright:**
- Verificar que el botón "Crear CV" existe
- Verificar que al hacer clic se abre el selector de plantillas
- Verificar que se crea un CV nuevo en la base de datos
- Verificar redirección al editor después de crear

---

### Commit 4.4: Implementar eliminar CV
**Explicación simple:** 
Añadimos un botón de eliminar en cada CV. Cuando el usuario confirma, el CV se borra permanentemente. Es como el botón de eliminar archivo.

**Archivos:**
- Modificar `components/dashboard/CVCard.tsx`
- `app/api/cv/[id]/route.ts` - API para eliminar CV
- `components/dashboard/DeleteCVModal.tsx` - Confirmación

**Tests con Playwright:**
- Verificar que el botón eliminar existe
- Verificar que aparece modal de confirmación
- Verificar que se puede cancelar la eliminación
- Verificar que se elimina correctamente al confirmar
- Verificar que el CV desaparece de la lista

---

### Commit 4.5: Implementar duplicar CV
**Explicación simple:** 
Añadimos un botón para copiar un CV existente. Útil cuando quieres hacer una versión similar. Es como "Guardar como copia".

**Archivos:**
- Modificar `components/dashboard/CVCard.tsx`
- Modificar `app/api/cv/route.ts` - Endpoint para duplicar

**Tests con Playwright:**
- Verificar que el botón duplicar existe
- Verificar que se crea una copia del CV
- Verificar que la copia tiene los mismos datos
- Verificar que aparece en la lista

---

## 📦 RAMA 5: `feature/plantillas` - Sistema de Plantillas

**¿Qué hacemos aquí?**
Creamos los diferentes diseños (plantillas) que los usuarios pueden elegir para su CV. Es como tener diferentes estilos de papel para escribir.

### Commit 5.1: Crear estructura base de plantillas
**Explicación simple:** 
Creamos el sistema que permite cambiar entre diferentes plantillas. Es como tener un selector de temas.

**Archivos:**
- `components/templates/TemplateSelector.tsx` - Selector de plantillas
- `lib/templates.ts` - Lista de plantillas disponibles
- `types/template.ts` - Tipos para plantillas

**Tests con Playwright:**
- Verificar que el selector se muestra
- Verificar que se pueden ver todas las plantillas
- Verificar que se puede seleccionar una plantilla

---

### Commit 5.2: Crear plantilla Modern (diseño moderno)
**Explicación simple:** 
Creamos la primera plantilla con un diseño moderno y limpio. Es como diseñar el primer tipo de papel con un estilo específico.

**Archivos:**
- `components/templates/templates/ModernTemplate.tsx` - Componente de plantilla
- Estilos específicos para esta plantilla

**Tests con Playwright:**
- Verificar que la plantilla se renderiza correctamente
- Verificar que todos los campos se muestran
- Verificar que es responsive
- Verificar que los datos se muestran correctamente

---

### Commit 5.3: Crear plantilla Classic (diseño clásico)
**Explicación simple:** 
Creamos una segunda plantilla con un diseño más tradicional y profesional. Es como tener un segundo estilo de papel más formal.

**Archivos:**
- `components/templates/templates/ClassicTemplate.tsx`

**Tests con Playwright:**
- Mismos tests que ModernTemplate
- Verificar que es diferente visualmente

---

### Commit 5.4: Crear plantilla Creative (diseño creativo)
**Explicación simple:** 
Creamos una tercera plantilla con un diseño más creativo y colorido. Ideal para diseñadores o artistas.

**Archivos:**
- `components/templates/templates/CreativeTemplate.tsx`

**Tests con Playwright:**
- Mismos tests que anteriores
- Verificar diseño creativo único

---

### Commit 5.5: Crear plantilla Minimal (diseño minimalista)
**Explicación simple:** 
Creamos una cuarta plantilla con diseño minimalista: mucho espacio en blanco, pocos colores. Elegante y simple.

**Archivos:**
- `components/templates/templates/MinimalTemplate.tsx`

**Tests con Playwright:**
- Mismos tests que anteriores

---

### Commit 5.6: Crear plantilla Professional (diseño profesional)
**Explicación simple:** 
Creamos una quinta plantilla optimizada para empresas y sistemas ATS (sistemas que leen CVs automáticamente).

**Archivos:**
- `components/templates/templates/ProfessionalTemplate.tsx`

**Tests con Playwright:**
- Mismos tests que anteriores
- Verificar compatibilidad ATS (estructura clara)

---

## 📦 RAMA 6: `feature/editor-basico` - Editor de CV (Versión Básica)

**¿Qué hacemos aquí?**
Creamos el editor donde el usuario puede escribir y editar la información de su CV. Primero hacemos una versión simple con formularios, luego añadiremos el drag & drop.

### Commit 6.1: Crear página del editor
**Explicación simple:** 
Creamos la página donde el usuario editará su CV. Tiene un formulario a la izquierda y una vista previa a la derecha.

**Archivos:**
- `app/(dashboard)/editor/[id]/page.tsx` - Página del editor
- `components/editor/EditorLayout.tsx` - Layout del editor

**Tests con Playwright:**
- Verificar que la página carga
- Verificar que se muestra el editor
- Verificar que se carga el CV correcto según el ID

---

### Commit 6.2: Crear formulario de información personal
**Explicación simple:** 
Creamos el formulario donde el usuario escribe su nombre, email, teléfono, etc. Es como llenar los datos básicos de contacto.

**Archivos:**
- `components/editor/sections/PersonalInfoForm.tsx` - Formulario de datos personales
- `components/editor/FormField.tsx` - Campo de formulario reutilizable

**Tests con Playwright:**
- Verificar que los campos se muestran
- Verificar que se puede escribir en los campos
- Verificar que los datos se guardan
- Verificar validación (email válido, teléfono válido)

---

### Commit 6.3: Crear formulario de experiencia laboral
**Explicación simple:** 
Creamos el formulario para añadir trabajos anteriores. El usuario puede añadir múltiples trabajos (empresa, puesto, fechas, descripción).

**Archivos:**
- `components/editor/sections/ExperienceForm.tsx` - Formulario de experiencia
- `components/editor/ExperienceItem.tsx` - Item individual de experiencia

**Tests con Playwright:**
- Verificar que se puede añadir una experiencia
- Verificar que se pueden añadir múltiples experiencias
- Verificar que se puede editar una experiencia
- Verificar que se puede eliminar una experiencia
- Verificar validación de fechas

---

### Commit 6.4: Crear formulario de educación
**Explicación simple:** 
Creamos el formulario para añadir estudios (universidad, carrera, fechas). Similar al de experiencia pero para educación.

**Archivos:**
- `components/editor/sections/EducationForm.tsx`
- `components/editor/EducationItem.tsx`

**Tests con Playwright:**
- Mismos tests que experiencia pero para educación

---

### Commit 6.5: Crear formulario de habilidades
**Explicación simple:** 
Creamos el formulario para añadir habilidades (por ejemplo: JavaScript, Photoshop, Inglés). El usuario puede añadir múltiples habilidades.

**Archivos:**
- `components/editor/sections/SkillsForm.tsx`
- `components/editor/SkillTag.tsx` - Etiqueta de habilidad

**Tests con Playwright:**
- Verificar que se pueden añadir habilidades
- Verificar que se pueden eliminar habilidades
- Verificar que se muestran como etiquetas

---

### Commit 6.6: Implementar guardado automático
**Explicación simple:** 
Hacemos que el CV se guarde automáticamente cada vez que el usuario escribe algo. Así no pierde su trabajo si cierra la página.

**Archivos:**
- Modificar componentes del editor para guardar automáticamente
- `lib/auto-save.ts` - Lógica de guardado automático
- Modificar `app/api/cv/[id]/route.ts` - Endpoint de actualización

**Tests con Playwright:**
- Verificar que los cambios se guardan automáticamente
- Verificar que al recargar la página los datos persisten
- Verificar indicador de "Guardando..." / "Guardado"

---

## 📦 RAMA 7: `feature/vista-previa` - Vista Previa en Tiempo Real

**¿Qué hacemos aquí?**
Hacemos que la vista previa se actualice automáticamente mientras el usuario escribe. Es como un espejo que muestra cómo te ves mientras te arreglas.

### Commit 7.1: Crear componente de vista previa
**Explicación simple:** 
Creamos el panel donde se muestra cómo quedará el CV. Por ahora solo muestra la información, luego se actualizará en tiempo real.

**Archivos:**
- `components/editor/PreviewPanel.tsx` - Panel de vista previa
- `components/editor/PreviewContainer.tsx` - Contenedor de preview

**Tests con Playwright:**
- Verificar que la vista previa se muestra
- Verificar que muestra los datos del CV
- Verificar que usa la plantilla correcta

---

### Commit 7.2: Implementar sincronización en tiempo real
**Explicación simple:** 
Conectamos el formulario con la vista previa. Cada vez que el usuario escribe algo, la vista previa se actualiza instantáneamente. Es como escribir en un documento y ver el resultado al mismo tiempo.

**Archivos:**
- Modificar `components/editor/EditorLayout.tsx` - Estado compartido
- Usar React Context o estado compartido

**Tests con Playwright:**
- Verificar que al escribir en el formulario, la vista previa se actualiza
- Verificar que los cambios son instantáneos
- Verificar que no hay retraso notable

---

### Commit 7.3: Añadir toggle para vista móvil/desktop
**Explicación simple:** 
Añadimos botones para ver cómo se verá el CV en móvil o en computadora. Útil para asegurarse de que se ve bien en ambos.

**Archivos:**
- Modificar `components/editor/PreviewPanel.tsx`
- `components/editor/ViewportToggle.tsx` - Botones de vista

**Tests con Playwright:**
- Verificar que los botones existen
- Verificar que cambia el tamaño de la vista previa
- Verificar que se ve correctamente en ambos modos

---

## 📦 RAMA 8: `feature/drag-drop` - Editor Drag & Drop

**¿Qué hacemos aquí?**
Mejoramos el editor para que el usuario pueda arrastrar y soltar secciones para reordenarlas. Es como organizar papeles en una mesa moviéndolos con la mano.

### Commit 8.1: Instalar y configurar @dnd-kit
**Explicación simple:** 
Instalamos la herramienta que permite arrastrar y soltar elementos. Es como instalar un plugin que añade esta funcionalidad.

**Archivos:**
- `package.json` - Añadir dependencias
- Configuración básica de @dnd-kit

**Tests con Playwright:**
- Verificar que la librería está instalada
- Verificar que no hay errores de configuración

---

### Commit 8.2: Implementar drag & drop para reordenar secciones
**Explicación simple:** 
Hacemos que las secciones del CV (Experiencia, Educación, etc.) se puedan arrastrar para cambiar su orden. El usuario puede decidir qué sección va primero.

**Archivos:**
- Modificar `components/editor/EditorLayout.tsx`
- `components/editor/SectionDraggable.tsx` - Sección arrastrable
- `components/editor/DropZone.tsx` - Zona donde se suelta

**Tests con Playwright:**
- Verificar que las secciones se pueden arrastrar
- Verificar que se pueden soltar en nueva posición
- Verificar que el orden se guarda
- Verificar que la vista previa se actualiza con el nuevo orden
- Verificar feedback visual al arrastrar

---

### Commit 8.3: Implementar drag & drop para elementos dentro de secciones
**Explicación simple:** 
Ahora también se pueden reordenar elementos dentro de una sección. Por ejemplo, cambiar el orden de los trabajos en "Experiencia".

**Archivos:**
- Modificar `components/editor/sections/ExperienceForm.tsx`
- Modificar `components/editor/sections/EducationForm.tsx`
- Hacer items arrastrables

**Tests con Playwright:**
- Verificar que se pueden reordenar experiencias
- Verificar que se pueden reordenar estudios
- Verificar que el orden se guarda correctamente

---

### Commit 8.4: Añadir panel de elementos arrastrables
**Explicación simple:** 
Creamos un panel lateral con elementos que el usuario puede arrastrar al CV (por ejemplo: añadir una nueva sección de "Proyectos"). Es como una caja de herramientas.

**Archivos:**
- `components/editor/ElementPicker.tsx` - Panel de elementos
- `components/editor/DraggableElement.tsx` - Elemento arrastrable

**Tests con Playwright:**
- Verificar que el panel se muestra
- Verificar que se pueden arrastrar elementos del panel
- Verificar que se pueden añadir nuevas secciones
- Verificar que las nuevas secciones aparecen en el CV

---

## 📦 RAMA 9: `feature/exportar-pdf` - Exportación a PDF

**¿Qué hacemos aquí?**
Permitimos que el usuario descargue su CV como archivo PDF. Es como hacer "Imprimir a PDF" pero automáticamente.

### Commit 9.1: Instalar y configurar librería de PDF
**Explicación simple:** 
Instalamos la herramienta que convierte nuestro CV (que es una página web) en un archivo PDF. Es como tener una impresora virtual.

**Archivos:**
- `package.json` - Añadir react-pdf o jsPDF
- `lib/pdf-generator.ts` - Configuración básica

**Tests con Playwright:**
- Verificar que la librería está instalada
- Verificar que no hay errores

---

### Commit 9.2: Crear función de generación de PDF
**Explicación simple:** 
Creamos la función que toma el CV renderizado y lo convierte en PDF. Es como tomar una foto de la página y guardarla como PDF.

**Archivos:**
- `lib/pdf-generator.ts` - Función de generación
- `components/pdf/PDFTemplate.tsx` - Versión del CV optimizada para PDF

**Tests con Playwright:**
- Verificar que se puede generar un PDF
- Verificar que el PDF contiene la información correcta
- Verificar que el formato es correcto

---

### Commit 9.3: Crear botón de exportar y API endpoint
**Explicación simple:** 
Añadimos un botón "Descargar PDF" en el editor. Cuando el usuario hace clic, se genera y descarga el PDF automáticamente.

**Archivos:**
- `components/editor/ExportButton.tsx` - Botón de exportar
- `app/api/export/[id]/route.ts` - API para generar PDF

**Tests con Playwright:**
- Verificar que el botón existe
- Verificar que al hacer clic se descarga el PDF
- Verificar que el PDF tiene el nombre correcto
- Verificar que el PDF se genera correctamente para cada plantilla

---

### Commit 9.4: Optimizar PDF para diferentes plantillas
**Explicación simple:** 
Aseguramos que cada plantilla se vea bien cuando se convierte a PDF. Algunos diseños necesitan ajustes especiales para PDF.

**Archivos:**
- Modificar `components/pdf/PDFTemplate.tsx`
- Ajustar estilos para cada plantilla

**Tests con Playwright:**
- Verificar que cada plantilla genera PDF correctamente
- Verificar que no se corta contenido
- Verificar que los colores se mantienen
- Verificar que las fuentes se ven bien

---

## 📦 RAMA 10: `feature/compartir` - Compartir CV con Enlace Público

**¿Qué hacemos aquí?**
Permitimos que el usuario comparta su CV con un enlace público. Cualquiera con el enlace puede ver el CV sin necesidad de iniciar sesión.

### Commit 10.1: Añadir campo isPublic y publicSlug al modelo CV
**Explicación simple:** 
Modificamos la base de datos para guardar si un CV es público y su enlace único. Es como añadir una casilla "¿Hacer público?" y generar una URL especial.

**Archivos:**
- Modificar `prisma/schema.prisma` - Añadir campos
- Ejecutar migración

**Tests con Playwright:**
- Verificar que los campos existen en la base de datos
- Verificar que se pueden actualizar

---

### Commit 10.2: Crear API para generar enlace público
**Explicación simple:** 
Creamos la función que genera un enlace único para cada CV (como: cv-maker.com/cv/abc123). Cada CV tiene su propio enlace secreto.

**Archivos:**
- `app/api/cv/[id]/share/route.ts` - API para activar/desactivar compartir
- `lib/share.ts` - Función para generar slug único

**Tests con Playwright:**
- Verificar que se puede generar un enlace
- Verificar que el enlace es único
- Verificar que se puede desactivar el compartir

---

### Commit 10.3: Crear página pública de CV
**Explicación simple:** 
Creamos una página especial que muestra el CV sin necesidad de iniciar sesión. Cualquiera con el enlace puede verla.

**Archivos:**
- `app/cv/[slug]/page.tsx` - Página pública del CV
- `components/cv/PublicCVView.tsx` - Vista pública

**Tests con Playwright:**
- Verificar que la página carga sin autenticación
- Verificar que muestra el CV correcto
- Verificar que no muestra información sensible
- Verificar que CVs privados no son accesibles

---

### Commit 10.4: Añadir botón de compartir en el editor
**Explicación simple:** 
Añadimos un botón en el editor para activar/desactivar el compartir y copiar el enlace. El usuario puede decidir si quiere compartir su CV.

**Archivos:**
- `components/editor/ShareButton.tsx` - Botón de compartir
- `components/editor/ShareModal.tsx` - Modal con el enlace

**Tests con Playwright:**
- Verificar que el botón existe
- Verificar que se puede activar compartir
- Verificar que se muestra el enlace
- Verificar que se puede copiar el enlace
- Verificar que se puede desactivar compartir

---

### Commit 10.5: Añadir opciones de privacidad
**Explicación simple:** 
Añadimos opciones para que el usuario controle quién puede ver su CV. Por ejemplo: hacer público, hacer privado, o permitir solo con contraseña (opcional avanzado).

**Archivos:**
- Modificar `components/editor/ShareModal.tsx`
- Añadir opciones de privacidad

**Tests con Playwright:**
- Verificar que se pueden cambiar opciones de privacidad
- Verificar que los cambios se guardan
- Verificar que las opciones funcionan correctamente

---

## 📦 RAMA 11: `feature/responsive` - Diseño Responsive

**¿Qué hacemos aquí?**
Aseguramos que la aplicación se vea bien en móviles, tablets y computadoras. Es como hacer que una foto se ajuste a cualquier tamaño de marco.

### Commit 11.1: Hacer dashboard responsive
**Explicación simple:** 
Ajustamos el dashboard para que en móvil las tarjetas se apilen verticalmente y el menú se convierta en un menú hamburguesa.

**Archivos:**
- Modificar `app/(dashboard)/dashboard/page.tsx`
- Modificar `components/dashboard/Sidebar.tsx`
- Ajustar estilos con Tailwind responsive

**Tests con Playwright:**
- Verificar que se ve bien en desktop
- Verificar que se ve bien en tablet
- Verificar que se ve bien en móvil
- Verificar que el menú hamburguesa funciona en móvil

---

### Commit 11.2: Hacer editor responsive
**Explicación simple:** 
En móvil, el editor y la vista previa se apilan verticalmente (uno arriba del otro) en lugar de lado a lado. También ajustamos los formularios.

**Archivos:**
- Modificar `components/editor/EditorLayout.tsx`
- Ajustar formularios para móvil

**Tests con Playwright:**
- Verificar que el editor funciona en móvil
- Verificar que se puede editar en móvil
- Verificar que la vista previa se muestra correctamente
- Verificar que drag & drop funciona en móvil (touch)

---

### Commit 11.3: Hacer plantillas responsive
**Explicación simple:** 
Aseguramos que todas las plantillas se vean bien en cualquier tamaño de pantalla. Los textos se ajustan y las imágenes se redimensionan.

**Archivos:**
- Modificar todas las plantillas
- Ajustar estilos responsive

**Tests con Playwright:**
- Verificar cada plantilla en diferentes tamaños
- Verificar que no se corta contenido
- Verificar que los textos son legibles

---

### Commit 11.4: Optimizar para tablets
**Explicación simple:** 
Ajustamos específicamente para tablets (pantallas medianas). A veces necesitan un diseño especial entre móvil y desktop.

**Archivos:**
- Ajustar breakpoints de Tailwind
- Modificar layouts para tablets

**Tests con Playwright:**
- Verificar que funciona bien en tablets
- Verificar que el diseño es apropiado

---

## 📦 RAMA 12: `feature/tests` - Tests con Playwright

**¿Qué hacemos aquí?**
Creamos tests automatizados que verifican que todo funciona correctamente. Es como tener un asistente que prueba la aplicación por ti.

### Commit 12.1: Configurar Playwright
**Explicación simple:** 
Instalamos y configuramos Playwright, que es la herramienta que usaremos para hacer tests. Es como instalar un robot que prueba la aplicación.

**Archivos:**
- `playwright.config.ts` - Configuración de Playwright
- `package.json` - Scripts de test
- Estructura de carpetas para tests

**Tests con Playwright:**
- Verificar que Playwright está instalado
- Ejecutar test básico de ejemplo

---

### Commit 12.2: Crear tests de autenticación
**Explicación simple:** 
Creamos tests que verifican que el login y registro funcionan correctamente. El robot prueba estos flujos automáticamente.

**Archivos:**
- `tests/auth/login.spec.ts` - Tests de login
- `tests/auth/register.spec.ts` - Tests de registro
- `tests/auth/protection.spec.ts` - Tests de protección de rutas

**Tests con Playwright:**
- Ejecutar todos los tests de autenticación
- Verificar que pasan todos

---

### Commit 12.3: Crear tests del dashboard
**Explicación simple:** 
Creamos tests que verifican que el dashboard funciona: crear CV, listar CVs, eliminar, etc.

**Archivos:**
- `tests/dashboard/cv-list.spec.ts` - Tests de lista
- `tests/dashboard/create-cv.spec.ts` - Tests de crear
- `tests/dashboard/delete-cv.spec.ts` - Tests de eliminar

**Tests con Playwright:**
- Ejecutar todos los tests del dashboard
- Verificar que pasan todos

---

### Commit 12.4: Crear tests del editor
**Explicación simple:** 
Creamos tests que verifican que el editor funciona: editar campos, guardar, vista previa, etc.

**Archivos:**
- `tests/editor/edit-cv.spec.ts` - Tests de edición
- `tests/editor/preview.spec.ts` - Tests de vista previa
- `tests/editor/auto-save.spec.ts` - Tests de guardado automático

**Tests con Playwright:**
- Ejecutar todos los tests del editor
- Verificar que pasan todos

---

### Commit 12.5: Crear tests de drag & drop
**Explicación simple:** 
Creamos tests que verifican que el drag & drop funciona correctamente. El robot simula arrastrar elementos.

**Archivos:**
- `tests/editor/drag-drop.spec.ts` - Tests de drag & drop

**Tests con Playwright:**
- Ejecutar tests de drag & drop
- Verificar que pasan todos

---

### Commit 12.6: Crear tests de exportación PDF
**Explicación simple:** 
Creamos tests que verifican que la exportación a PDF funciona y genera archivos correctos.

**Archivos:**
- `tests/export/pdf.spec.ts` - Tests de PDF

**Tests con Playwright:**
- Ejecutar tests de PDF
- Verificar que se genera el PDF
- Verificar que el contenido es correcto

---

### Commit 12.7: Crear tests de compartir
**Explicación simple:** 
Creamos tests que verifican que el sistema de compartir funciona: generar enlaces, ver CVs públicos, etc.

**Archivos:**
- `tests/share/public-link.spec.ts` - Tests de enlaces públicos
- `tests/share/privacy.spec.ts` - Tests de privacidad

**Tests con Playwright:**
- Ejecutar todos los tests de compartir
- Verificar que pasan todos

---

### Commit 12.8: Crear tests end-to-end (flujo completo)
**Explicación simple:** 
Creamos tests que prueban un flujo completo: registrarse, crear CV, editarlo, exportarlo, compartirlo. Es como una prueba de principio a fin.

**Archivos:**
- `tests/e2e/complete-flow.spec.ts` - Test de flujo completo

**Tests con Playwright:**
- Ejecutar test end-to-end
- Verificar que todo el flujo funciona

---

## 📦 RAMA 13: `feature/polish` - Mejoras Finales y Pulido

**¿Qué hacemos aquí?**
Mejoramos la experiencia del usuario: añadimos animaciones, mejoramos mensajes de error, añadimos indicadores de carga, etc. Es como dar los últimos toques a una pintura.

### Commit 13.1: Añadir animaciones y transiciones
**Explicación simple:** 
Añadimos animaciones suaves cuando cambias de página o interactúas con elementos. Hace que la aplicación se sienta más profesional y agradable.

**Archivos:**
- Añadir animaciones con Framer Motion o CSS
- Transiciones entre páginas

**Tests con Playwright:**
- Verificar que las animaciones no rompen la funcionalidad
- Verificar que mejoran la experiencia

---

### Commit 13.2: Mejorar mensajes de error y validación
**Explicación simple:** 
Mejoramos los mensajes que aparecen cuando algo sale mal. En lugar de "Error", mostramos mensajes claros como "El email ya está en uso".

**Archivos:**
- Modificar componentes de formularios
- Añadir mensajes de error claros
- Mejorar validaciones

**Tests con Playwright:**
- Verificar que los mensajes de error son claros
- Verificar que las validaciones funcionan

---

### Commit 13.3: Añadir indicadores de carga
**Explicación simple:** 
Añadimos spinners (ruedas de carga) y mensajes como "Guardando..." para que el usuario sepa que algo está pasando. Evita que el usuario piense que la app está rota.

**Archivos:**
- `components/ui/LoadingSpinner.tsx` - Componente de carga
- Añadir estados de carga en componentes

**Tests con Playwright:**
- Verificar que aparecen indicadores de carga
- Verificar que desaparecen cuando termina

---

### Commit 13.4: Optimizar rendimiento
**Explicación simple:** 
Hacemos que la aplicación cargue más rápido y use menos recursos. Es como optimizar un coche para que vaya más rápido con menos gasolina.

**Archivos:**
- Lazy loading de componentes
- Optimización de imágenes
- Code splitting

**Tests con Playwright:**
- Verificar que los tiempos de carga son aceptables
- Verificar que no hay problemas de rendimiento

---

### Commit 13.5: Añadir SEO y meta tags
**Explicación simple:** 
Añadimos información que ayuda a los buscadores (Google) a entender qué es nuestra aplicación. También mejoramos cómo se ven los enlaces compartidos en redes sociales.

**Archivos:**
- Modificar `app/layout.tsx` - Meta tags
- Modificar `app/cv/[slug]/page.tsx` - Meta tags dinámicos

**Tests con Playwright:**
- Verificar que los meta tags existen
- Verificar que son correctos

---

### Commit 13.6: Añadir manejo de errores global
**Explicación simple:** 
Creamos una página de error amigable que aparece cuando algo sale mal. En lugar de una pantalla blanca, mostramos un mensaje útil.

**Archivos:**
- `app/error.tsx` - Página de error
- `app/not-found.tsx` - Página 404

**Tests con Playwright:**
- Verificar que las páginas de error se muestran
- Verificar que son útiles

---

## 📦 RAMA 14: `feature/documentacion` - Documentación

**¿Qué hacemos aquí?**
Creamos documentación completa del proyecto para que cualquier persona pueda entenderlo y trabajar en él.

### Commit 14.1: Crear README principal
**Explicación simple:** 
Creamos un archivo README que explica qué es el proyecto, cómo instalarlo y cómo usarlo. Es como el manual de instrucciones.

**Archivos:**
- `README.md` - Documentación principal

---

### Commit 14.2: Documentar estructura del proyecto
**Explicación simple:** 
Creamos documentación que explica cómo está organizado el código. Es como un mapa del proyecto.

**Archivos:**
- `docs/ESTRUCTURA.md` - Estructura del proyecto

---

### Commit 14.3: Documentar API endpoints
**Explicación simple:** 
Documentamos todas las APIs (rutas del servidor) explicando qué hacen y cómo usarlas.

**Archivos:**
- `docs/API.md` - Documentación de API

---

### Commit 14.4: Crear guía de desarrollo
**Explicación simple:** 
Creamos una guía para desarrolladores que quieran contribuir al proyecto. Explica cómo añadir nuevas plantillas, cómo hacer cambios, etc.

**Archivos:**
- `docs/GUIA_DESARROLLO.md` - Guía de desarrollo

---

## 🎯 Resumen de Ramas

1. **setup/inicial** - Preparar proyecto
2. **feature/base-datos** - Base de datos
3. **feature/autenticacion** - Login y registro
4. **feature/dashboard** - Panel principal
5. **feature/plantillas** - Sistema de plantillas
6. **feature/editor-basico** - Editor básico
7. **feature/vista-previa** - Vista previa
8. **feature/drag-drop** - Drag & drop
9. **feature/exportar-pdf** - Exportar PDF
10. **feature/compartir** - Compartir CV
11. **feature/responsive** - Diseño responsive
12. **feature/tests** - Tests con Playwright
13. **feature/polish** - Mejoras finales
14. **feature/documentacion** - Documentación

---

## 📝 Notas Importantes

- Cada rama se mergea a `main` cuando está completa y probada
- Los tests de Playwright se ejecutan antes de hacer merge
- Cada commit debe ser pequeño y enfocado en una cosa
- Los mensajes de commit deben ser claros y descriptivos
- Siempre probar en diferentes navegadores y dispositivos

---

## 🚀 Orden de Ejecución

1. Primero: Setup inicial (Rama 1)
2. Segundo: Base de datos (Rama 2)
3. Tercero: Autenticación (Rama 3)
4. Cuarto: Dashboard (Rama 4)
5. Quinto: Plantillas (Rama 5)
6. Sexto: Editor básico (Rama 6)
7. Séptimo: Vista previa (Rama 7)
8. Octavo: Drag & drop (Rama 8)
9. Noveno: Exportar PDF (Rama 9)
10. Décimo: Compartir (Rama 10)
11. Undécimo: Responsive (Rama 11)
12. Duodécimo: Tests (Rama 12)
13. Decimotercero: Polish (Rama 13)
14. Decimocuarto: Documentación (Rama 14)

---

¡Listo para empezar! 🎉



