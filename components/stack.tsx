import { BiLogoVisualStudio } from "react-icons/bi";
import { FaCss } from "react-icons/fa6";
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
  SiPnpm,
  SiElectron,
  SiZod,
  SiExpo,
  SiClaude,
  SiGooglegemini,
  SiGithubactions,
} from "react-icons/si";
import { NeonIcon } from "./icons/icons";
import { TbBrandVercelFilled } from "react-icons/tb";
import { BsOpenai } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";

export const Stack = () => {
  const stacks = [
    {
      title: "Lenguages",
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
        { name: "Expo", icon: SiExpo },
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
        { name: "Playwright", icon: FaTheaterMasks },
        { name: "Zod", icon: SiZod },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MySQL", icon: SiMysql },
        { name: "Supabase", icon: SiSupabase },
        { name: "Neon", icon: NeonIcon },
      ],
    },
    {
      title: "Workflow",
      items: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "GitHub Actions", icon: SiGithubactions },
        { name: "Vercel", icon: TbBrandVercelFilled },
        { name: "VS Code", icon: BiLogoVisualStudio },
        { name: "pnpm", icon: SiPnpm },
      ],
    },
    {
      title: "AI",
      items: [
        { name: "Claude", icon: SiClaude },
        { name: "ChatGPT", icon: BsOpenai },
        { name: "Gemini", icon: SiGooglegemini },
      ],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl border-x border-border-color">
      <div className="space-y-1 md:space-y-3 mb-6 md:mb-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Tecnología que uso
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Stack
        </h2>
         <p className="max-w-2xl text-base text-muted-foreground">
          El stack tecnológico con el que trabajo cotidianamente.
        </p>
      </div>

      <div className="overflow-hidden border-t border-b border-border-color">
        {stacks.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-border-color last:border-b-0"
          >
            <div className="flex flex-wrap items-center content-center md:border-r border-border-color px-6 pt-3 md:pt-0 text-sm text-muted-foreground">
              <span className="mr-2 font-mono-space text-background bg-foreground px-1 py-0.5 rounded-full opacity-80">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </div>

            <div className="flex flex-wrap gap-2 px-6 py-3 md:py-5">
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
                  <Icon className="md:size-5 size-4 text-muted-foreground" />
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
