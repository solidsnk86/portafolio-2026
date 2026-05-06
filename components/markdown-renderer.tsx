"use client";

import "highlight.js/styles/an-old-hope.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useRef } from "react";

export default function MarkdownRenderer({ content }: { content: string }) {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
        remarkGfm
      ]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 xl:text-3xl text-2xl font-bold pb-2 border-b border-[var(--border-color)]">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 xl:text-2xl text-xl font-semibold pb-2 border-b border-[var(--border-color)]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-4 mb-2 xl:text-xl text-lg font-semibold">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="xl:text-base text-sm">{children}</p>
        ),
        pre: ({ children }) => (
          <div className="my-3 xl:text-sm text-xs relative text-zinc-300">
            <pre className="p-2 bg-[#1C1D21] rounded-lg overflow-auto" ref={preRef}>
              {children}
            </pre>
          </div>
        ),
        li: ({ children }) => (
          <li className="mb-2 list-disc list-inside xl:text-base text-sm">{children}</li>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" className="text-blue-400 hover:underline">
            {children}
          </a>
        ),
        hr: () => <hr className="my-4 border-2 border-[var(--mutted-color)]" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
