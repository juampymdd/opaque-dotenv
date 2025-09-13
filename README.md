Opaque Secrets
===============

Tiny Next.js app for safely previewing dotenv files and writing Markdown.

- Paste or drag & drop a `.env` file into the editor.
- The preview masks values by showing them Base64-encoded (visible only in preview).
- Includes syntax highlighting (CodeMirror), a copy button for masked output, and responsive layout.

Run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 and start pasting dotenv or Markdown content.

This project uses Tailwind and CodeMirror for the editor UI.

## opaque-dotenv

Pequeña app Next.js para previsualizar y enmascarar archivos .env usando CodeMirror y Tailwind.

Resumen rápido (EN): Tiny Next.js app for safely previewing dotenv files and writing Markdown.

Características
- Editor con CodeMirror 6 via `@uiw/react-codemirror`.
- Previsualización que enmascara valores `.env` mostrando su Base64.
- Responsive con Tailwind CSS. Usar utilidades Tailwind en lugar de CSS personalizado cuando sea posible.

Requisitos
- Bun (recomendado) o Node.js
- Git

Instalación (Bun recomendado)

```bash
bun install
```

Comandos útiles

- Desarrollo (dev):

```bash
bun run dev
```

- Build producción:

```bash
bun run build
```

- Start producción (si aplica):

```bash
bun run start
```

Notas importantes

- Tailwind-first: evitar estilos inline y CSS global no necesarios. Preferir utilidades Tailwind.
- CodeMirror: si aparece el error "Unrecognized extension value in extension set ([object Object])" es probable que haya múltiples versiones de `@codemirror/*` en `node_modules`.
	- Solución rápida:
		1. Revisar `package.json` y eliminar dependencias antiguas (por ejemplo `@codemirror/highlight`).
		2. Forzar versiones únicas con `overrides` o la estrategia de tu package manager.
		3. Borrar `node_modules` y reinstalar.

Uso
- Pegar o arrastrar un `.env` al editor para cargarlo.
- La previsualización muestra `KEY: "BASE64"` (no revela los valores originales).
- Botón "Copiar" copia el contenido enmascarado al portapapeles.

Contribuir
- Abrí un issue o PR con detalles claros.
- Mantener la convención Tailwind-only cuando sea posible.

Contacto
- Owner: juampymdd

---
Puedo añadir secciones (deploy, pruebas, screenshots, badges) si querés. Si querés, corro la build ahora y actualizo el README con instrucciones específicas según el resultado.
