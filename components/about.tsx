import Link from "next/link";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl border-b border-border-color px-4 py-16"
    >
      <div className=" grid md:grid-cols-2 justify-center space-y-5 text-left">
        <div className="md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Sobre mi
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Desarrollo web práctico, moderno y eficiente
          </h2>
        </div>
        <article className="space-y-4 md:p-8">
          <p className="text-base text-muted-foreground">
            Transformo necesidades reales en productos claros, escalables y
            útiles.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Soy desarrollador web con 3 años de experiencia, egresado de la
            UTN-FRSR. Trabajo con una mirada práctica, priorizo simplicidad,
            rendimiento y una buena experiencia de usuario en cada entrega.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Hoy potencio mi flujo con agentes de IA para investigar, prototipar,
            refactorizar y documentar más rápido, sin perder criterio técnico.
            La IA me ayuda a acelerar, pero las decisiones de arquitectura y
            calidad siempre las guío en el contexto del proyecto.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Actualmente colaboro con un cliente en Chile en el proyecto
            <Link
              href="http://pascalecloset.com/"
              className="mx-1 font-semibold hover:underline text-accent"
            >
              @pascale-closet.
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}
