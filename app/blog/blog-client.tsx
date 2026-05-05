"use client";

import MarkdownRenderer from "@/components/markdown-renderer";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const BlogClient = ({ blog }: { blog: string }) => {
  const [blogContent, setBlogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TypeError | Error | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const readBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/read-blog?name=${encodeURIComponent(blog)}`);
        const data = await res.json();
        if (mounted) setBlogContent(data.blogContent);
      } catch (err) {
        if (mounted) setError(err as TypeError);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    // call async fetch inside effect to avoid synchronous setState during render
    readBlog();

    return () => {
      mounted = false;
    };
  }, [blog]);

  return (
    <section className="px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2 self-start text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Volver al inicio</span>
        </Link>
        {isLoading ? (
          <div className="flex h-dvh items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <article className="space-y-6 text-foreground">
            <MarkdownRenderer content={blogContent} />
          </article>
        )}
        {error && (
          <small className="rounded border border-red-300/50 bg-red-500/80 px-2 py-0.5 text-white">
            {error.message}
          </small>
        )}
      </div>
    </section>
  );
};
