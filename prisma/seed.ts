/**
 * Seed data para la base de datos
 * 
 * Este archivo crea datos de ejemplo para probar la aplicación.
 * Se ejecuta con: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear un usuario de ejemplo
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Usuario Demo',
      password: 'hashed_password_here', // En producción, esto debe estar hasheado
    },
  });

  console.log('✅ Usuario creado:', user.email);

  // Crear un CV de ejemplo
  const cvData = {
    personalInfo: {
      fullName: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+34 600 123 456',
      location: 'Madrid, España',
      website: 'https://juanperez.dev',
      linkedin: 'https://linkedin.com/in/juanperez',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Company',
        position: 'Frontend Developer',
        startDate: '2022-01-01',
        endDate: null,
        description: 'Desarrollo de aplicaciones web con React y Next.js',
        current: true,
      },
    ],
    education: [
      {
        id: '1',
        institution: 'Universidad de Madrid',
        degree: 'Grado en Ingeniería Informática',
        field: 'Informática',
        startDate: '2018-09-01',
        endDate: '2022-06-30',
        current: false,
      },
    ],
    skills: [
      { id: '1', name: 'React', level: 'advanced' },
      { id: '2', name: 'TypeScript', level: 'advanced' },
      { id: '3', name: 'Next.js', level: 'intermediate' },
    ],
    summary: 'Desarrollador frontend con experiencia en React y Next.js',
  };

  const cv = await prisma.cv.upsert({
    where: { slug: 'cv-juan-perez-2024' },
    update: {},
    create: {
      userId: user.id,
      title: 'CV Frontend Developer',
      slug: 'cv-juan-perez-2024',
      template: 'modern',
      data: JSON.stringify(cvData),
      isPublic: true,
      publicSlug: 'juan-perez-2024',
    },
  });

  console.log('✅ CV creado:', cv.title);

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });








