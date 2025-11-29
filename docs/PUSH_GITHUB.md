# 🔐 Configurar Autenticación para GitHub

## Problema
Git necesita autenticación para hacer push a GitHub.

## Soluciones

### Opción 1: Usar SSH (Recomendado)

1. **Verificar si ya tienes una clave SSH:**
   ```bash
   ls -al ~/.ssh
   ```

2. **Si no tienes clave SSH, crear una:**
   ```bash
   ssh-keygen -t ed25519 -C "tu-email@example.com"
   # Presiona Enter para aceptar la ubicación predeterminada
   # Opcional: añade una contraseña
   ```

3. **Copiar la clave pública:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copia todo el contenido
   ```

4. **Añadir la clave a GitHub:**
   - Ve a: https://github.com/settings/keys
   - Click en "New SSH key"
   - Pega tu clave pública
   - Guarda

5. **Cambiar el remote a SSH:**
   ```bash
   git remote set-url origin git@github.com:zuma-code/CV-maker.git
   ```

6. **Probar la conexión:**
   ```bash
   ssh -T git@github.com
   ```

### Opción 2: Usar Personal Access Token (PAT)

1. **Crear un token en GitHub:**
   - Ve a: https://github.com/settings/tokens
   - Click en "Generate new token (classic)"
   - Selecciona permisos: `repo` (acceso completo a repositorios)
   - Genera y copia el token

2. **Usar el token al hacer push:**
   ```bash
   git push -u origin main
   # Username: tu-usuario-de-github
   # Password: pega-tu-token-aqui
   ```

3. **O configurar Git Credential Helper:**
   ```bash
   git config --global credential.helper osxkeychain
   ```

### Opción 3: Usar GitHub CLI (gh)

```bash
# Instalar GitHub CLI (si no lo tienes)
brew install gh

# Autenticarse
gh auth login

# Luego hacer push normalmente
git push -u origin main
```

## Después de configurar

Una vez configurada la autenticación, ejecuta:

```bash
git push -u origin main
git push -u origin setup/inicial
git push -u origin feature/base-datos
git push -u origin feature/autenticacion
```



