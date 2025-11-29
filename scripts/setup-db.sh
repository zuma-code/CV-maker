#!/bin/bash

# Script para configurar la base de datos
# Ejecuta: bash scripts/setup-db.sh

echo "🔧 Configurando base de datos..."

# Verificar que Prisma está instalado
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx no está instalado"
    exit 1
fi

# Generar Prisma Client
echo "📦 Generando Prisma Client..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones..."
npx prisma migrate dev --name init

# Verificar que la base de datos existe
if [ -f "prisma/dev.db" ]; then
    echo "✅ Base de datos creada exitosamente en prisma/dev.db"
else
    echo "⚠️  Advertencia: No se encontró prisma/dev.db"
fi

echo "✨ ¡Configuración completada!"



