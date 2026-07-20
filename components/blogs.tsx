"use client";

import { useContentData } from "@/context/content-context";
import Link from "next/link";
import { timeAgo } from "@/utils/formatRelativeTime";

export function Blogs() {
  const { blogs, isLoadingBlogs } = useContentData();

  return (
    <section
      id="blogs"
      className="mx-auto max-w-6xl border-b border-border-color pt-8 border-x"
    >
      <div className="space-y-3 mb-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Contenido
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Notas y aprendizajes
          {blogs && (
            <div className="inline-flex text-lg -translate-y-3 ml-1">
              <span>({blogs.length})</span>
            </div>
          )}
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Ideas, procesos y experiencias reales construyendo productos.
        </p>
      </div>

      <div className="grid">
        {isLoadingBlogs ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <article
                key={`blog-${i + 1}`}
                className="border-b border-border-color p-4 first:border-t last:border-0 animate-pulse"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-secondary"></div>
                    <p className="text-xs text-muted-foreground w-28 h-4 bg-secondary"></p>
                  </div>
                  <p className="text-xs text-muted-foreground bg-secondary w-22 h-4"></p>
                </div>
                <h4 className="mb-3 font-semibold text-foreground text-xl md:text-2xl w-160 bg-secondary h-9"></h4>
              </article>
            ))}
          </>
        ) : (
          blogs
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .slice(0, 4)
            .map((blog) => (
              <article
                key={blog.name}
                className="border-b border-border-color p-4 hover:bg-secondary odd:bg-card first:border-t last:border-0"
              >
                <Link href={`/blog/${blog.name}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded">
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
        {/* <div className="flex justify-center my-3">
          <button className="flex gap-1.5 items-center border border-border-color rounded px-2 py-1 w-fit bg-secondary">
            Todos los posts
          </button>
        </div> */}
      </div>
    </section>
  );
}
