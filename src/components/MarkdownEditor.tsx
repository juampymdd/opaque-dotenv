"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
// removed custom highlight imports to use built-in theme/basic setup

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineFormatRaw(text: string) {
  let t = text;
  t = t.replace(
    /`([^`]*)`/g,
    '<code class="text-pink-600 bg-pink-50 dark:bg-white/5 px-1 rounded">$1</code>'
  );
  t = t.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>'
  );
  t = t.replace(/\*([^*]+)\*/g, '<em class="text-gray-500 italic">$1</em>');
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a class="text-sky-500 underline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return t;
}

function renderMarkdown(md: string) {
  if (!md) return "";
  const lines = md.split("\n");
  let html = "";
  let inCodeBlock = false;
  let listMode: string | null = null;

  const toBase64 = (s: string) => {
    try {
      if (typeof window !== "undefined" && typeof window.btoa === "function") {
        return window.btoa(unescape(encodeURIComponent(s)));
      }
      return s;
    } catch {
      return s;
    }
  };

  const maskDotenv = (text: string) => {
    // replace KEY=VALUE with KEY: "BASE64"
    return text.replace(
      /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/gm,
      (_m: string, key: string, val: string) => {
        const encoded = escapeHtml(toBase64((val || "").trim()));
        return `${key}: <code class=\"text-violet-600 dark:text-violet-300\">\"${encoded}\"</code>`;
      }
    );
  };

  for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw;

    if (/^```/.test(line)) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        html += "<pre><code>";
      } else {
        inCodeBlock = false;
        html += "</code></pre>";
      }
      continue;
    }

    if (inCodeBlock) {
      html += `<pre class=\"text-pink-500 bg-pink-50 dark:bg-white/5 p-2 rounded-md\">${escapeHtml(
        line
      )}</pre>`;
      continue;
    }

    // comments starting with #
    if (/^\s*#/.test(line)) {
      html += `<p class=\"text-gray-500 font-mono\">${escapeHtml(line)}</p>`;
      continue;
    }

    // headings
    if (/^#{1,6}\s+/.test(line)) {
      const m = line.match(/^(#{1,6})\s+(.*)/);
      if (m) {
        const level = m[1].length;
        const escaped = escapeHtml(m[2]);
        const masked = maskDotenv(escaped);
        const content = inlineFormatRaw(masked);
        html += `<h${level} class=\"text-sky-600 font-bold\">${content}</h${level}>`;
        continue;
      }
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      if (listMode !== "ul") {
        if (listMode) html += `</${listMode}>`;
        listMode = "ul";
        html += "<ul>";
      }
      const item = line.replace(/^\s*[-*]\s+/, "");
      const escaped = escapeHtml(item);
      const masked = maskDotenv(escaped);
      html += `<li class=\"pl-2\">${inlineFormatRaw(masked)}</li>`;
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      if (listMode !== "ol") {
        if (listMode) html += `</${listMode}>`;
        listMode = "ol";
        html += "<ol>";
      }
      const item = line.replace(/^\s*\d+\.\s+/, "");
      const escaped = escapeHtml(item);
      const masked = maskDotenv(escaped);
      html += `<li class=\"pl-2\">${inlineFormatRaw(masked)}</li>`;
      continue;
    }

    // blank line
    if (line.trim() === "") {
      if (listMode) {
        html += `</${listMode}>`;
        listMode = null;
      }
      html += "";
      continue;
    }

    const escaped = escapeHtml(line);
    const masked = maskDotenv(escaped);
    html += `<p class=\"mb-2\">${inlineFormatRaw(masked)}</p>`;
  }

  if (inCodeBlock) html += "</code></pre>";
  if (listMode) html += `</${listMode}>`;
  return html;
}

export default function MarkdownEditor() {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  // use built-in theme/basicSetup for syntax highlighting

  const html = renderMarkdown(value);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (!dt) return;
    const file = dt.files && dt.files[0];
    if (!file) return;
    if (
      (file.name && file.name.toLowerCase().endsWith(".env")) ||
      file.type.startsWith("text")
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result || "");
        setValue(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = async () => {
    // build masked text containing only KEY: "BASE64" lines
    const maskedPlain = value
      .split("\n")
      .map((ln) => {
        const m = ln.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m) {
          const left = m[1];
          const val = (m[2] || "").trim();
          try {
            const enc =
              typeof window !== "undefined" && typeof window.btoa === "function"
                ? window.btoa(unescape(encodeURIComponent(val)))
                : val;
            return `${left}: "${enc}"`;
          } catch {
            return `${left}: "${val}"`;
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(maskedPlain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col">
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Pega tus envs aqui
        </label>
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            overflow: "hidden",
            height: "60vh",
          }}
        >
          <div style={{ flex: 1, minHeight: 0 }}>
            <CodeMirror
              value={value}
              basicSetup={true}
              extensions={[markdown(), oneDark]}
              onChange={(v: string | undefined) => setValue(v ?? "")}
            />
          </div>
        </div>
      </div>

  <div className="flex flex-col">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <label style={{ display: "block", fontWeight: 600 }}>
            Previsualización
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              Copiar
            </button>
            {copied && (
              <span style={{ color: "green", fontSize: 13 }}>Copiado!</span>
            )}
          </div>
        </div>

        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
