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
