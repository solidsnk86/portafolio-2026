"use client";

import Image from "next/image";
import { timeAgo } from "@/utils/formatRelativeTime";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  name: string;
  title: string;
  date: Date | string;
  author: string;
  url: string;
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlog = useCallback(async () => {
    try {
      await fetch("/api/blog", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setBlogs(data.blog))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getBlog();
  }, [getBlog]);

  return (
    <section
      id="blogs"
      className="mx-auto max-w-6xl px-4 py-16 border-b border-border-color"
    >
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
        {blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((blog) => (
          <article
            key={blog.name}
            className="border-b border-border-color pb-8 last:border-0"
          >
            <Link href={`/blog/${blog.name}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/mgc.jfif"
                    alt="Gabriel avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{blog.author}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {timeAgo(new Date(blog.date))}
              </p>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3 md:text-3xl">
              {blog.title}
            </h3>
            {/* <p className="text-base text-muted-foreground max-w-3xl">
              {blog.url}
            </p> */}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
