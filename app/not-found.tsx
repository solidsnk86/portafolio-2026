import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-3">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 — Página no encontrada</h1>
        <p className="mt-4">Lo sentimos, no pudimos encontrar la página que buscas.</p>
        <Link href="/" className="mt-6 inline-block text-accent underline">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
