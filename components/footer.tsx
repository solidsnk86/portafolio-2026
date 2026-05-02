import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/gabriel" },
    { label: "GitHub", href: "https://github.com/solidsnk86" },
    { label: "Twitter", href: "https://twitter.com/solidsnk86" },
    { label: "Instagram", href: "https://instagram.com/solidsnk86" },
  ];

  const projectLinks = [
    { label: "E-commerce", href: "#projects" },
    { label: "Dashboard", href: "#projects" },
    { label: "Turnos App", href: "#projects" },
  ];

  const blogLinks = [
    { label: "TypeScript Tips", href: "#blogs" },
    { label: "React Patterns", href: "#blogs" },
    { label: "Next.js Best Practices", href: "#blogs" },
  ];

  return (
    <>
      <footer className="border-t border-x border-border-color">
        <div className="grid grid-cols-4 px-4">
          <div className="flex px-2 py-4">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Hoy potencio mi flujo con agentes de IA para investigar,
              prototipar, refactorizar y documentar mas rapido, sin perder
              criterio tecnico. La IA me ayuda a acelerar, pero las decisiones
              de arquitectura y calidad siempre las guia el contexto del
              proyecto.
            </p>
          </div>
          <div className="flex flex-col justify-start gap-2 border-x border-border-color py-4 px-4">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 border-r border-border-color py-4 px-4">
            {projectLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 py-4 px-4">
            {blogLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <div className="flex justify-between border-t border-border-color items-center border-x p-4">
        <div className="">
          <p className="font-sans text-muted-foreground text-sm">
            &copy; SolidSnk86 · Todos los derechos reservados
          </p>
        </div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
