/**
 * Configuración de Prisma Client
 * 
 * Este archivo crea una instancia única de Prisma Client que se reutiliza
 * en toda la aplicación. Esto evita crear múltiples conexiones a la base de datos.
 * 
 * En desarrollo, se recarga automáticamente.
 * En producción, se reutiliza la misma instancia.
 */

import { PrismaClient } from '@prisma/client';

// Variable global para almacenar la instancia de Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Crear o reutilizar la instancia de Prisma
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// En desarrollo, guardar la instancia en global para evitar múltiples conexiones
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}








