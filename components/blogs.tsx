import { timeAgo } from "@/utils/formatRelativeTime";

const blogs = [
  {
    id: 1,
    title: "Construir sistemas escalables con Next.js y Turbopacking",
    author: "Gabriel Dev",
    publishedAt: new Date("2026-04-28"),
    excerpt:
      "Exploramos cómo aprovechar Turbopack en Next.js 16 para mejorar tiempos de build y mantener arquitectura limpia en aplicaciones grandes.",
  },
  {
    id: 2,
    title: "Testing en TypeScript: patrones que funcionan en producción",
    author: "Gabriel Dev",
    publishedAt: new Date("2026-04-20"),
    excerpt:
      "Estrategias efectivas para escribir tests mantenibles y confiables usando Jest, Vitest y testing-library en proyectos TypeScript.",
  },
  {
    id: 3,
    title: "Dark mode sin flickering: implementación correcta con next-themes",
    author: "Gabriel Dev",
    publishedAt: new Date("2026-04-10"),
    excerpt:
      "Cómo evitar hydration mismatches y parpadeos al implementar tema oscuro en aplicaciones Next.js con soporte a preferencias del sistema.",
  },
  {
    id: 4,
    title: "Zustand vs Redux: cuándo usar cada una para estado global",
    author: "Gabriel Dev",
    publishedAt: new Date("2026-03-30"),
    excerpt:
      "Análisis comparativo de estas librerías de estado global, con ejemplos reales y decisiones arquitectónicas para elegir la correcta.",
  },
];

export function Blogs() {
  return (
    <section id="blogs" className="mx-auto max-w-6xl px-4 py-16 border-b border-border-color">
      <div className="space-y-3 mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Contenido
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Notas y aprendizajes
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Ideas, procesos y experiencias reales construyendo productos.
        </p>
      </div>

      <div className="space-y-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="border-b border-border-color pb-8 last:border-0"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-muted-foreground">{blog.author}</p>
              <p className="text-xs text-muted-foreground">
                {timeAgo(new Date(blog.publishedAt))}
              </p>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3 md:text-3xl">
              {blog.title}
            </h3>
            <p className="text-base text-muted-foreground max-w-3xl">
              {blog.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}