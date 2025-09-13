import MarkdownEditor from "../components/MarkdownEditor";

export default function Home() {
  return (
    <div>
      <section className="backdrop-blur-lg bg-black/20 dark:bg-black/20 rounded-lg p-6">
        <h1 className="text-4xl font-bold">Opaque Dotenv</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Pega tus archivos .env y conviertelos en secrets para utilizar en tu secret.yaml y
          disfruta de un drop y copiado rápido.
        </p>
      </section>

      <section className="mt-6 bg-white/3 dark:bg-black/3 rounded-lg p-4 shadow-sm">
        <MarkdownEditor />
      </section>
    </div>
  );
}
