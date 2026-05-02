import { About, Blogs, Contact, Footer, Header, Hero, Projects } from "@/components";

export default function Home() {
  return (
    <section className="min-h-screen overflow-x-hidden">
      <div className="max-w-6xl flex flex-col justify-center mx-auto relative">
        <div className="absolute w-6 h-full top-0 -left-4 md:-left-6 bg-stripes" />
        <Header />
        <main className="border-x border-border-color">
          <Hero />
          <About />
          <Projects />
          <Blogs />
          <Contact />
        </main>
        <Footer />
        <div className="absolute w-6 h-full top-0 -right-4 md:-right-6 bg-stripes" />
      </div>
    </section>
  );
}
