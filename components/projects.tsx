export function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Full Stack",
      summary: "Tienda online con autenticacion, pagos y panel de gestion.",
      stack: "Next.js, Node.js, PostgreSQL",
    },
    {
      id: 2,
      title: "Dashboard de Ventas",
      summary: "Panel de metricas en tiempo real con filtros y reportes.",
      stack: "React, Supabase, Chart.js",
    },
    {
      id: 3,
      title: "App de Turnos",
      summary: "Sistema de reservas con calendario, recordatorios y roles.",
      stack: "Next.js, Prisma, PostgreSQL",
    },
    {
      id: 4,
      title: "Landing para SaaS",
      summary: "Sitio de conversion orientado a performance y SEO tecnico.",
      stack: "Next.js, Tailwind CSS",
    },
    {
      id: 5,
      title: "Blog Tecnico",
      summary: "Plataforma de contenido con categorias y buscador.",
      stack: "Next.js, MDX, TypeScript",
    },
    {
      id: 6,
      title: "Sistema de Tickets",
      summary: "Gestion de incidencias con estados, prioridad y seguimiento.",
      stack: "React, Node.js, MongoDB",
    },
  ];

  return (
    <section id="projects" className="mx-auto max-w-6xl py-16">
      <div className="space-y-3 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Portfolio
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Proyectos destacados
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Una seleccion de trabajos donde priorice claridad tecnica,
          rendimiento y experiencia de usuario.
        </p>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="border-t border-r border-border-color bg-bg-card p-4 nth-last-[-n+3]:border-b"
          >
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
            <div className="flex gap-2">
              {project.stack.split(",").map((st, i) => (
              <p key={`${st}-${i}`} className="mt-3 text-xs text-secondary px-2 bg-foreground rounded-2xl">{st}</p>
            ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
