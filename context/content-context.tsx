"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface BlogEntry {
  name: string;
  title: string;
  date: string;
  author: string;
  url: string;
}

export interface ProjectEntry {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

type ContentContextValue = {
  blogs: BlogEntry[];
  projects: ProjectEntry[];
  isLoadingBlogs: boolean;
  isLoadingProjects: boolean;
};

const ContentContext = createContext<ContentContextValue | null>(null);

let cachedBlogs: BlogEntry[] | null = null;
let cachedProjects: ProjectEntry[] | null = null;
let blogsPromise: Promise<BlogEntry[]> | null = null;
let projectsPromise: Promise<ProjectEntry[]> | null = null;

async function loadBlogs() {
  if (cachedBlogs) {
    return cachedBlogs;
  }

  if (!blogsPromise) {
    blogsPromise = fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => {
        cachedBlogs = data.blog ?? [];
        return cachedBlogs;
      })
      .finally(() => {
        blogsPromise = null;
      });
  }

  return blogsPromise;
}

async function loadProjects() {
  if (cachedProjects) {
    return cachedProjects;
  }

  if (!projectsPromise) {
    projectsPromise = fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        cachedProjects = data.allProjects ?? [];
        return cachedProjects;
      })
      .finally(() => {
        projectsPromise = null;
      });
  }

  return projectsPromise;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogEntry[]>(cachedBlogs ?? []);
  const [projects, setProjects] = useState<ProjectEntry[]>(cachedProjects ?? []);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(!cachedBlogs);
  const [isLoadingProjects, setIsLoadingProjects] = useState(!cachedProjects);

  useEffect(() => {
    let active = true;

    const hydrateContent = async () => {
      try {
        const [nextBlogs, nextProjects] = await Promise.all([loadBlogs(), loadProjects()]);

        if (!active) {
          return;
        }

        setBlogs(nextBlogs ?? []);
        setProjects(nextProjects ?? []);
      } finally {
        if (active) {
          setIsLoadingBlogs(false);
          setIsLoadingProjects(false);
        }
      }
    };

    void hydrateContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ blogs, projects, isLoadingBlogs, isLoadingProjects }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentData() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContentData debe usarse dentro de ContentProvider");
  }

  return context;
}