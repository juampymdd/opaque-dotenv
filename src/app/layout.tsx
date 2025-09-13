import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Opaque Secrets", template: "%s | Opaque Secrets" },
  description:
    "Opaque Secrets — paste dotenv files or write Markdown; preview hides secret values as Base64, supports drag & drop, syntax highlighting and easy copy.",
  applicationName: "Opaque Secrets",
  keywords: [
    "dotenv",
    "markdown",
    "editor",
    "preview",
    "mask",
    "base64",
    "codemirror",
  ],
  authors: [{ name: "Opaque Secrets" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  openGraph: {
    title: "Opaque Secrets",
    description:
      "Paste dotenv files or write Markdown; preview masks secret values as Base64 and provides a safe copy button.",
    url: "http://localhost:3000/",
    siteName: "Opaque Secrets",
    images: [
      {
        url: "/window.svg",
        alt: "Opaque Secrets preview",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opaque Secrets",
    description:
      "Editor for dotenv + Markdown with masked preview (values shown as Base64) and drag & drop support.",
    images: ["/window.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 dark:bg-gradient-to-b dark:from-black/80 dark:via-slate-900 dark:to-black dark:text-gray-100`}
      >
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
