# 📄 Guía de Implementación: Exportación e Impresión

## 🎯 Objetivo
Implementar funcionalidades para exportar el CV a imágenes (PNG, JPG, SVG) y permitir imprimirlo directamente desde el navegador.

## ✅ Estado Actual

### Fase 1: Impresión (COMPLETADA) ✅
- [x] Añadir botón de impresión en PreviewControls
- [x] Crear función handlePrint que use window.print()
- [x] Crear componente PrintButton reutilizable
- [x] Añadir estilos CSS para impresión (@media print)
- [x] Ocultar elementos innecesarios al imprimir (headers, botones, etc.)
- [x] Añadir ID "cv-content" a las plantillas para impresión
- [x] Asegurar que el CV se vea bien en formato A4
- [x] Añadir botón de impresión en la página de preview

**Archivos modificados:**
- `components/editor/PreviewControls.tsx` - Añadido botón de impresión
- `components/editor/EditorLayout.tsx` - Añadida función handlePrint
- `components/editor/PrintButton.tsx` - Nuevo componente reutilizable
- `app/globals.css` - Añadidos estilos @media print
- `components/templates/ModernTemplate.tsx` - Añadido ID "cv-content"
- `components/templates/TemplateBase.tsx` - Añadido ID "cv-content"
- `app/(dashboard)/preview/page.tsx` - Añadido botón de impresión

### Fase 2: Exportación a Imágenes (PENDIENTE) 🔄
- [ ] Instalar dependencia html-to-image (en proceso)
- [ ] Crear función para exportar a PNG
- [ ] Crear función para exportar a JPG
- [ ] Crear función para exportar a SVG
- [ ] Añadir botones de exportación en PreviewControls
- [ ] Manejar errores y mostrar feedback al usuario

## 🔧 Cómo Funciona la Impresión

1. **Botón de Impresión**: El usuario hace clic en el botón "🖨️ Imprimir" en el editor o en la página de preview.

2. **window.print()**: Se abre el diálogo de impresión del navegador.

3. **Estilos CSS**: Los estilos `@media print` en `globals.css` se aplican automáticamente:
   - Ocultan todos los elementos excepto el CV (usando `visibility: hidden` y luego mostrando solo `#cv-content`)
   - Ajustan el tamaño de página a A4
   - Eliminan sombras y estilos innecesarios
   - Aseguran que los enlaces se vean bien

4. **Resultado**: El usuario puede imprimir o guardar como PDF desde el diálogo del navegador.

## 📦 Dependencias Necesarias (Para Exportación a Imágenes)

```bash
npm install html-to-image
```

## 🔧 Pasos de Implementación (Exportación a Imágenes)

### Paso 1: Crear componente de exportación
- Archivo: `components/editor/ExportButton.tsx`
- Funcionalidad: Exportar CV a PNG, JPG, SVG

### Paso 2: Crear hook para exportación
- Archivo: `hooks/useExportCV.ts`
- Funcionalidad: Lógica reutilizable para exportar

### Paso 3: Integrar en PreviewControls
- Archivo: `components/editor/PreviewControls.tsx`
- Funcionalidad: Conectar botones con funciones de exportación

## 📝 Notas Técnicas

- `html-to-image` convierte elementos HTML a imágenes
- Usa `document.getElementById` para encontrar el CV
- Genera archivos con nombres basados en el título del CV
- Los estilos de impresión ocultan elementos no necesarios
