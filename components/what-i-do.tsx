const tips = [
  {
    id: 1,
    tip: "Especialista en refactorizar proyectos React/Next.js que crecieron sin arquitectura.",
  },
  {
    id: 2,
    tip: "¿Tu proyecto creció demasiado rápido con IA? Te ayudo a convertirlo en un producto mantenible.",
  },
  {
    id: 3,
    tip: "¿Copiaste 3 repositorios, 5 prompts y ahora nada compila? Puedo ayudar.",
  },
  {
    id: 4,
    tip: "¿Tu proyecto creció demasiado rápido con IA? Te ayudo a convertirlo en un producto mantenible.",
  },
  {
    id: 5,
    tip: "Arreglo aplicaciones 'vibe-coded' y las dejo listas para producción.",
  },
];

export const WhatIDo = () => {
  return (
    <div className="max-w-6xl px-4 py-16 z-50">
      <div className="space-y-3 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          miscelanius
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          ¿Que puedo hacer por vos?
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Convierto prototipos generados con IA en software listo para
          producción.
        </p>
      </div>

      <ul className="my-3 md:px-4">
        {tips.map((t, i) => (
          <div className="flex gap-2 items-center space-y-1">
            <div className="bg-stripes border border-border-color w-8 h-8 px-2 py-0.5 flex content-center justify-center">
              <h3>{i + 1}</h3>
            </div>
            <li className="text-xs md:text-base text-balance" key={t.id}>
              {t.tip}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
