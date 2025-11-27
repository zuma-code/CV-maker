# 🔧 Solución al Error de Base de Datos

## Problema
Error 500 al intentar crear una cuenta. La base de datos no está inicializada.

## Solución Rápida

### Paso 1: Generar Prisma Client
```bash
npx prisma generate
```

### Paso 2: Ejecutar Migraciones (crea la base de datos)
```bash
npx prisma migrate dev
```

### Paso 3: Verificar que la base de datos existe
Deberías ver un archivo `prisma/dev.db` creado.

## Explicación

### ¿Por qué SQLite para desarrollo?
- ✅ No requiere instalar nada adicional
- ✅ Es un solo archivo (`dev.db`)
- ✅ Funciona inmediatamente
- ✅ Perfecto para desarrollo local

### ¿Cuándo cambiar a PostgreSQL?
Cuando despliegues en producción (Vercel, Railway, etc.), cambiarás a PostgreSQL:
1. Cambiar el `provider` en `schema.prisma` de `sqlite` a `postgresql`
2. Añadir la URL de PostgreSQL en las variables de entorno
3. Ejecutar las migraciones en producción

## Comandos Útiles

```bash
# Generar Prisma Client (después de cambiar el schema)
npx prisma generate

# Crear/actualizar base de datos
npx prisma migrate dev

# Ver la base de datos en el navegador
npx prisma studio

# Ver el estado de las migraciones
npx prisma migrate status
```

