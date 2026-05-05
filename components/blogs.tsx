"use client";

import { useContentData } from "@/context/content-context";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/utils/formatRelativeTime";

export function Blogs() {
  const { blogs, isLoadingBlogs } = useContentData();

  return (
    <section
      id="blogs"
      className="mx-auto max-w-6xl pt-1 border-b border-border-color"
    >
      <div className="space-y-3 mb-12 px-4">
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

      <div className="">
        {isLoadingBlogs ? (
          <p className="text-sm text-muted-foreground">Cargando artículos..</p>
        ) : (
          blogs
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((blog) => (
              <article
                key={blog.name}
                className="border-b border-border-color p-4 hover:bg-secondary first:border-t last:border-0"
              >
                <Link href={`/blog/${blog.name}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <picture>
                          <img
                            src="/mgc.jfif"
                            alt="Gabriel avatar"
                            width="100%"
                            height="100%"
                            className="object-cover"
                          />
                        </picture>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {blog.author}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(new Date(blog.date))}
                    </p>
                  </div>
                  <h4 className="mb-3 font-semibold text-foreground text-xl md:text-2xl">
                    {blog.title}
                  </h4>
                </Link>
              </article>
            ))
        )}
      </div>
    </section>
  );
}
