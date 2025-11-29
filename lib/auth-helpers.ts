/**
 * Funciones helper para autenticación
 * 
 * Funciones auxiliares para hashear contraseñas y validar datos
 */

import bcrypt from "bcryptjs";
import { prisma } from "./db";

/**
 * Hashea una contraseña usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Valida que un email no esté ya en uso
 */
export async function isEmailTaken(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !!user;
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que la contraseña tenga al menos 6 caracteres
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}



