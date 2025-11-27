import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

/**
 * Tests para la base de datos
 * Verifica que Prisma funciona correctamente y que se pueden crear/leer datos
 */
test.describe('Base de Datos', () => {
  let prisma: PrismaClient;

  test.beforeAll(async () => {
    prisma = new PrismaClient();
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test('debe poder conectarse a la base de datos', async () => {
    // Verificar que Prisma puede conectarse
    await expect(prisma.$connect()).resolves.not.toThrow();
  });

  test('debe poder crear un usuario', async () => {
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        password: 'hashed_password',
      },
    });

    expect(user).toBeDefined();
    expect(user.email).toContain('@example.com');
    expect(user.id).toBeDefined();

    // Limpiar: eliminar el usuario de prueba
    await prisma.user.delete({
      where: { id: user.id },
    });
  });

  test('debe poder crear un CV asociado a un usuario', async () => {
    // Crear usuario de prueba
    const user = await prisma.user.create({
      data: {
        email: `test-cv-${Date.now()}@example.com`,
        name: 'Test User',
        password: 'hashed_password',
      },
    });

    // Crear CV de prueba
    const cvData = {
      personalInfo: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+34 600 000 000',
        location: 'Madrid, España',
      },
      experience: [],
      education: [],
      skills: [],
    };

    const cv = await prisma.cv.create({
      data: {
        userId: user.id,
        title: 'Test CV',
        slug: `test-cv-${Date.now()}`,
        template: 'modern',
        data: JSON.stringify(cvData),
        isPublic: false,
      },
    });

    expect(cv).toBeDefined();
    expect(cv.userId).toBe(user.id);
    expect(cv.title).toBe('Test CV');

    // Limpiar: eliminar CV y usuario
    await prisma.cv.delete({ where: { id: cv.id } });
    await prisma.user.delete({ where: { id: user.id } });
  });

  test('debe poder buscar un usuario por email', async () => {
    const testEmail = `test-find-${Date.now()}@example.com`;
    
    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Test User',
        password: 'hashed_password',
      },
    });

    // Buscar usuario
    const foundUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(user.id);

    // Limpiar
    await prisma.user.delete({ where: { id: user.id } });
  });

  test('debe poder listar CVs de un usuario', async () => {
    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: `test-list-${Date.now()}@example.com`,
        name: 'Test User',
        password: 'hashed_password',
      },
    });

    // Crear múltiples CVs
    const cvData = {
      personalInfo: { fullName: 'Test', email: 'test@example.com', phone: '+34 600 000 000', location: 'Madrid' },
      experience: [],
      education: [],
      skills: [],
    };

    await prisma.cv.createMany({
      data: [
        {
          userId: user.id,
          title: 'CV 1',
          slug: `test-cv-1-${Date.now()}`,
          template: 'modern',
          data: JSON.stringify(cvData),
        },
        {
          userId: user.id,
          title: 'CV 2',
          slug: `test-cv-2-${Date.now()}`,
          template: 'classic',
          data: JSON.stringify(cvData),
        },
      ],
    });

    // Listar CVs del usuario
    const cvs = await prisma.cv.findMany({
      where: { userId: user.id },
    });

    expect(cvs.length).toBeGreaterThanOrEqual(2);

    // Limpiar
    await prisma.cv.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });
  });
});

