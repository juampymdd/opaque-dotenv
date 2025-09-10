import MarkdownEditor from "../components/MarkdownEditor";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 className="text-4xl">Opaque Dotenv</h1>
      <p>
        Esta aplicación utiliza variables de entorno opacas para gestionar la
        configuración.
      </p>
      <p>
        Las variables de entorno opacas son una forma segura de manejar
        información sensible, como claves API y credenciales, sin exponerlas en
        el código fuente.
      </p>

      <section style={{ marginTop: 24 }}>
        <MarkdownEditor />
      </section>
    </main>
  );
}
