"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Algo salió mal</h2>
          <p className="mt-2">{error?.message ?? "Error inesperado"}</p>
          <button
            className="mt-4 inline-block px-4 py-2 bg-accent text-white rounded"
            onClick={() => reset()}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
