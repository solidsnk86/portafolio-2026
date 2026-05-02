import Link from "next/link";

export function Contact() {
  const whatsappNumber = "5491234567890"; // Reemplaza con tu número
  const whatsappMessage = "Hola, quiero hablar sobre un proyecto.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="space-y-3 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contacto
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Hablemos de tu proximo proyecto
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Si tienes una idea o necesitas mejorar un producto existente, podemos
            construir una solucion clara y escalable.
          </p>
        </div>

        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold transition-colors md:mt-6"
        >
          Contactame en WhatsApp
        </Link>
      </div>
    </section>
  );
}