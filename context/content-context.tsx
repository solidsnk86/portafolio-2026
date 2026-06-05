"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
  metrics: MetricsEntry;
  isLoadingMetrics: boolean;
};

type MetricsEntry = {
  geoRequests: number;
  neoWifiUsers: number;
  downloadCount: number;
};

const ContentContext = createContext<ContentContextValue | null>(null);

let cachedBlogs: BlogEntry[] | null = null;
let cachedProjects: ProjectEntry[] | null = null;
let cachedMetrics: MetricsEntry | null = null;
let blogsPromise: Promise<BlogEntry[]> | null = null;
let projectsPromise: Promise<ProjectEntry[]> | null = null;
let metricsPromise: Promise<MetricsEntry> | null = null;

async function loadBlogs(): Promise<BlogEntry[]> {
  if (cachedBlogs) {
    return cachedBlogs;
  }

  if (!blogsPromise) {
    blogsPromise = fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => {
        const result: BlogEntry[] = data?.blog ?? [];
        cachedBlogs = result;
        return result;
      })
      .catch(() => {
        const result: BlogEntry[] = [];
        cachedBlogs = result;
        return result;
      })
      .finally(() => {
        blogsPromise = null;
      });
  }

  return blogsPromise as Promise<BlogEntry[]>;
}

async function loadProjects(): Promise<ProjectEntry[]> {
  if (cachedProjects) {
    return cachedProjects;
  }

  if (!projectsPromise) {
    projectsPromise = fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        const result: ProjectEntry[] = data?.allProjects ?? [];
        cachedProjects = result;
        return result;
      })
      .catch(() => {
        const result: ProjectEntry[] = [];
        cachedProjects = result;
        return result;
      })
      .finally(() => {
        projectsPromise = null;
      });
  }

  return projectsPromise as Promise<ProjectEntry[]>;
}

async function getMetrics(): Promise<MetricsEntry> {
  if (cachedMetrics) return cachedMetrics;

  if (!metricsPromise) {
    metricsPromise = fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => {
        const result: MetricsEntry = data ?? { geoRequests: 0, neoWifiUsers: 0, downloadCount: 0 };
        cachedMetrics = result;
        return result;
      })
      .catch(() => {
        const result: MetricsEntry = { geoRequests: 0, neoWifiUsers: 0, downloadCount: 0 };
        cachedMetrics = result;
        return result;
      })
      .finally(() => {
        metricsPromise = null;
      });
  }

  return metricsPromise as Promise<MetricsEntry>;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogEntry[]>(cachedBlogs ?? []);
  const [projects, setProjects] = useState<ProjectEntry[]>(
    cachedProjects ?? [],
  );
  const [metrics, setMetrics] = useState<MetricsEntry>(cachedMetrics ?? { geoRequests: 0, neoWifiUsers: 0, downloadCount: 0 });
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(!cachedMetrics);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(!cachedBlogs);
  const [isLoadingProjects, setIsLoadingProjects] = useState(!cachedProjects);

  useEffect(() => {
    let active = true;

    const hydrateContent = async () => {
      try {
        const [nextBlogs, nextProjects, nextMetrics] = await Promise.all([
          loadBlogs(),
          loadProjects(),
          getMetrics()
        ]);

        if (!active) {
          return;
        }

        setBlogs(nextBlogs ?? []);
        setProjects(nextProjects ?? []);
        setMetrics(nextMetrics ?? { geoRequests: 0, neoWifiUsers: 0, downloadCount: 0 });
      } finally {
        if (active) {
          setIsLoadingBlogs(false);
          setIsLoadingProjects(false);
          setIsLoadingMetrics(false);
        }
      }
    };

    void hydrateContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider
      value={{ blogs, projects, isLoadingBlogs, isLoadingProjects, metrics, isLoadingMetrics }}
    >
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
