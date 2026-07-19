import { Clock, LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const whatsappNumber = "+5492665290020";
const whatsappMessage =
  "Hola Gabriel, quiero hablar sobre un proyecto que tengo en mente.";
export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
export const email = "calcagni.gabriel86@gmail.com";
const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

function diffHoras(tzA: string, tzB: string, fecha = new Date()) {
  const enA = new Date(
    fecha.toLocaleString("en-US", { timeZone: tzA }),
  ).getTime();
  const enB = new Date(
    fecha.toLocaleString("en-US", { timeZone: tzB }),
  ).getTime();
  return (enA - enB) / (1000 * 60 * 60);
}

const determineDiff = () => {
  const diff = diffHoras(visitorTZ, "America/Argentina/Buenos_Aires");
  if (diff === 0) return ``;
  if (diff > 0) return ` / diferencia ${diff} hs.`;
  if (diff < 0) return ` / diferencia ${diff} hs.`;
};

const contacts = [
  {
    content:
      new Date()
        .toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
        .toUpperCase() + determineDiff(),
    icon: Clock,
  },
   {
    content: "+54 2665 290020",
    src: "tel:+542665290020",
    icon: Phone,
  },
  {
    content: "Concarán - San Luis, Argentina",
    icon: MapPin,
  },
  {
    content: "calcagni.gabriel86@gmail.com",
    src: "mailto:calcagni.gabriel86@gmail.com",
    icon: Mail,
  },
  {
    content: "gabrielcalcagni.vercel.app",
    src: "https://gabrielcalcagni.vercel.app",
    icon: LinkIcon,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-16 z-50 bg-background"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="space-y-3 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contacto
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Hablemos de tu proximo proyecto
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Si tienes una idea o necesitás mejorar un producto existente,
            podemos construir una solucion clara y escalable.
          </p>

          <p className="max-w-2xl text-base text-muted-foreground">
            ¿Tu proyecto creció demasiado rápido con IA? Te ayudo a convertirlo
            en un producto mantenible.
          </p>
        </div>

        <section className="md:mt-6">
          <div className="flex flex-col gap-3">
            {contacts.map(({ content, src, icon: Icon }) => {
              return src ? (
                <Link
                  href={src as string}
                  key={content}
                  className="flex gap-4 items-center hover:underline"
                >
                  <div className="p-1 border border-border-color rounded-md bg-secondary outline-1 outline-border-color outline-offset-1">
                    <Icon
                      size={16}
                      className="text-muted-foreground stroke-0.5"
                    />
                  </div>
                  {content}
                </Link>
              ) : (
                <div
                  key={content}
                  className="flex gap-4 cursor-default items-center"
                >
                  <div className="p-1 border border-border-color rounded-md bg-secondary outline-1 outline-border-color outline-offset-1 cursor-default">
                    <Icon
                      size={16}
                      className="text-muted-foreground stroke-0.5"
                    />
                  </div>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
