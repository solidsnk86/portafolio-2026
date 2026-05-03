import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-3">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 — Página no encontrada</h1>
        <p className="my-4">
          Lo sentimos, no pudimos encontrar la página que buscas.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold transition-colors duration-300 hover:bg-secondary hover:text-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
