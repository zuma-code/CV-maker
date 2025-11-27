# 🔗 Configurar Repositorio en GitHub

## Pasos para conectar el proyecto con GitHub

### 1. Crear el repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name**: `CV-maker` (o el nombre que prefieras)
3. **Description** (opcional): "Aplicación web para crear currículums profesionales"
4. **Visibilidad**: Elige Público o Privado
5. **IMPORTANTE**: NO marques ninguna de estas opciones:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Haz clic en **"Create repository"**

### 2. Copiar la URL del repositorio

Después de crear el repositorio, GitHub te mostrará una página con instrucciones. 
Necesitas copiar la URL que aparece. Será algo como:

```
https://github.com/tu-usuario/CV-maker.git
```

O si usas SSH:

```
git@github.com:tu-usuario/CV-maker.git
```

### 3. Conectar el repositorio local

Una vez que tengas la URL, ejecuta estos comandos en la terminal:

```bash
# Añadir el repositorio remoto (reemplaza TU-URL con la URL real)
git remote add origin https://github.com/tu-usuario/CV-maker.git

# Verificar que se añadió correctamente
git remote -v

# Cambiar el nombre de la rama principal a 'main' (si es necesario)
git branch -M main

# Hacer push de todos los commits
git push -u origin main
```

### 4. Verificar

Después del push, ve a tu repositorio en GitHub y deberías ver todos los archivos y commits.

---

## Nota Importante

**No hagas push hasta que te lo pida explícitamente**, según las reglas del proyecto.

Cuando estés listo para hacer push, simplemente dímelo y lo haré.

