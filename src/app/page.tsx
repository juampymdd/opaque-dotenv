import MarkdownEditor from "../components/MarkdownEditor";

export default function Home() {
  return (
    <div>
      <section className="bg-white/5 dark:bg-black/5 rounded-lg p-6">
        <h1 className="text-4xl font-bold">Opaque Dotenv</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Pega tus archivos .env o escribe Markdown. La previsualización ocultará
          los valores sensibles mostrando su Base64 y tendrás soporte para drag &
          drop y copiado rápido.
        </p>
      </section>

      <section className="mt-6 bg-white/3 dark:bg-black/3 rounded-lg p-4 shadow-sm">
        <MarkdownEditor />
      </section>
    </div>
  );
}
