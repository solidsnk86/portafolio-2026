import { BiLogoVisualStudio } from "react-icons/bi";
import { FaCss } from "react-icons/fa6";
import { LuDatabase } from "react-icons/lu";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostman,
  SiPnpm,
  SiElectron,
  SiZod,
} from "react-icons/si";

export const Stack = () => {
  const stacks = [
    {
      title: "Languages",
      items: [
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
      ],
    },
    {
      title: "Frontend",
      items: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: FaCss },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "Electron", icon: SiElectron },
        { name: "Zod", icon: SiZod },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MySQL", icon: SiMysql },
        { name: "Supabase", icon: SiSupabase },
        { name: "Neon", icon: LuDatabase },
      ],
    },
    {
      title: "Workflow",
      items: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Vercel", icon: SiVercel },
        { name: "Postman", icon: SiPostman },
        { name: "VS Code", icon: BiLogoVisualStudio },
        { name: "pnpm", icon: SiPnpm },
        { name: "Vercel", icon: SiVercel },
      ],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl">
      <div className="space-y-1 md:space-y-3 mb-6 md:mb-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Lo que más uso
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Stack
        </h2>
      </div>

      <div className="overflow-hidden border-t border-b border-border-color">
        {stacks.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-border-color last:border-b-0"
          >
            <div className="md:border-r border-border-color px-6 py-1 md:py-5 text-sm text-neutral-500">
              <span className="mr-2 font-mono text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </div>

            <div className="flex flex-wrap gap-2 px-6 py-1 md:py-5">
              {section.items.map(({ name, icon: Icon }, i) => (
                <div
                  key={`${name}-${i}`}
                  className="
                    flex items-center gap-2
                    rounded-full
                    border border-border-color
                    bg-secondary
                    px-3 py-1
                    md:text-xs
                    text-[11px]
                    transition-colors
            "
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
