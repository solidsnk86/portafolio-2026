import { Wifi } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full grid justify-center h-svh relative">
      <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-900/60 z-50"></div>
      <div className="fixed inset-0 grid grid-cols-6 gap-px">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`item-${i + 1}`}
            className="bg-hero"
            style={{ background: `hsl(${(i / 18) * 360}, 70%, 50%)` }}
          ></div>
        ))}
      </div>
      <article className="flex flex-col justify-center z-50">
        <div className="grid grid-cols-5">
          {["", "n", "e", "x", "t", "w", "i", "f", "i"].map((letter, i) => (
            <div
              key={letter + i}
              className="flex justify-center bg-black first:bg-transparent p-6"
            >
              <h1 className="text-7xl uppercase">{letter}</h1>
            </div>
          ))}
          <div className="flex justify-center bg-pink-200 first:bg-transparent">
            <div className="w-full h-full grid content-center justify-center bg-black md:translate-x-4 md:-translate-y-4">
              <Wifi size={72} className="" />
            </div>
          </div>
        </div>
        <div className="bg-red-500 px-16 w-full">
          <p className="text-lg uppercase font-thin italic text-black tracking-[0.2em]">
            Simplifica la conexión a tu red WiFi
          </p>
        </div>
      </article>
    </section>
  );
}
