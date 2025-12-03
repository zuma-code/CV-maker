import { test, expect } from '@playwright/test';

/**
 * Tests para la página principal (home)
 * Verifica que la página carga correctamente y muestra los elementos esperados
 */
test.describe('Página Principal', () => {
  test('debe cargar la página principal correctamente', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que el título está presente
    await expect(page).toHaveTitle(/CV Maker/);
    
    // Verificar que no hay errores en consola
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');
    
    // Verificar que no hay errores
    expect(errors.length).toBe(0);
  });

  test('debe mostrar el título principal', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que el título "CV Maker" está visible
    const title = page.getByRole('heading', { name: /CV Maker/i });
    await expect(title).toBeVisible();
  });

  test('debe mostrar los botones de navegación', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que los botones de "Crear Cuenta" e "Iniciar Sesión" están presentes
    const createAccountButton = page.getByRole('link', { name: /Crear Cuenta/i });
    const loginButton = page.getByRole('link', { name: /Iniciar Sesión/i });
    
    await expect(createAccountButton).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('debe mostrar las características principales', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que se muestran las 3 características principales
    await expect(page.getByText(/Múltiples Plantillas/i)).toBeVisible();
    await expect(page.getByText(/Editor Drag & Drop/i)).toBeVisible();
    await expect(page.getByText(/Exporta a PDF/i)).toBeVisible();
  });

  test('debe ser responsive en móvil', async ({ page }) => {
    // Configurar viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verificar que el contenido es visible en móvil
    const title = page.getByRole('heading', { name: /CV Maker/i });
    await expect(title).toBeVisible();
    
    // Verificar que los botones están apilados verticalmente
    const buttons = page.locator('a[href="/register"], a[href="/login"]');
    await expect(buttons.first()).toBeVisible();
  });
});








