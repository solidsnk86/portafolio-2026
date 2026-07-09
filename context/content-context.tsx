"use client";

import {
  createContext,
  useCallback,
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

export interface HistoryChat {
  id: string;
  user_id: string;
  messages: string;
  created_at: Date | string;
}

const defaultMetrics: MetricsEntry = {
  geoRequests: 0,
  neoWifiUsers: 0,
  downloadCount: 0,
  apkDownloadsCount: 0,
};

type ContentContextValue = {
  blogs: BlogEntry[];
  projects: ProjectEntry[];
  isLoadingBlogs: boolean;
  isLoadingProjects: boolean;
  metrics: MetricsEntry;
  isLoadingMetrics: boolean;
  historyChat: HistoryChat | null;
  isLoadingHistoryChat: boolean;
  refreshHistory: () => Promise<HistoryChat | null>;
};

type MetricsEntry = {
  geoRequests: number;
  neoWifiUsers: number;
  downloadCount: number;
  apkDownloadsCount: number;
};

const ContentContext = createContext<ContentContextValue | null>(null);

let cachedBlogs: BlogEntry[] | null = null;
let cachedProjects: ProjectEntry[] | null = null;
let cachedMetrics: MetricsEntry | null = null;
let blogsPromise: Promise<BlogEntry[]> | null = null;
let projectsPromise: Promise<ProjectEntry[]> | null = null;
let metricsPromise: Promise<MetricsEntry> | null = null;
let cachedHistory: HistoryChat | null | undefined = undefined;
let historyPromise: Promise<HistoryChat | null> | null = null;

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
        const result: MetricsEntry = {
          geoRequests: Number(data?.geoRequests ?? defaultMetrics.geoRequests),
          neoWifiUsers: Number(
            data?.neoWifiUsers ?? defaultMetrics.neoWifiUsers,
          ),
          downloadCount: Number(
            data?.downloadCount ?? defaultMetrics.downloadCount,
          ),
          apkDownloadsCount: Number(
            data?.apkDownloadsCount ?? defaultMetrics.apkDownloadsCount,
          ),
        };
        cachedMetrics = result;
        return result;
      })
      .catch(() => {
        const result: MetricsEntry = { ...defaultMetrics };
        cachedMetrics = result;
        return result;
      })
      .finally(() => {
        metricsPromise = null;
      });
  }

  return metricsPromise as Promise<MetricsEntry>;
}

async function getHistoryChat(force = false): Promise<HistoryChat | null> {
  if (force) {
    cachedHistory = undefined;
    historyPromise = null;
  }

  if (cachedHistory !== undefined) return cachedHistory;

  if (!historyPromise) {
    historyPromise = fetch("/api/collection/history/last")
      .then((res) => res.json())
      .then((data) => {
        const result: HistoryChat | null = data?.success
          ? (data.data ?? null)
          : null;
        cachedHistory = result;
        return result;
      })
      .catch(() => {
        const result: HistoryChat | null = null;
        cachedHistory = result;
        return result;
      })
      .finally(() => {
        historyPromise = null;
      });
  }

  return historyPromise as Promise<HistoryChat | null>;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogEntry[]>(cachedBlogs ?? []);
  const [projects, setProjects] = useState<ProjectEntry[]>(
    cachedProjects ?? [],
  );
  const [metrics, setMetrics] = useState<MetricsEntry>(
    cachedMetrics ?? defaultMetrics,
  );
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(!cachedMetrics);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(!cachedBlogs);
  const [isLoadingProjects, setIsLoadingProjects] = useState(!cachedProjects);
  const [historyChat, setHistoryChat] = useState<HistoryChat | null>(
    cachedHistory ?? null,
  );
  const [isLoadingHistoryChat, setIsLoadingHistoryChat] = useState(
    cachedHistory === undefined,
  );

  useEffect(() => {
    let active = true;

    const hydrateContent = async () => {
      try {
        const [nextBlogs, nextProjects, nextMetrics, nextHistoryChat] =
          await Promise.all([
            loadBlogs(),
            loadProjects(),
            getMetrics(),
            getHistoryChat(),
          ]);

        if (!active) {
          return;
        }

        setBlogs(nextBlogs ?? []);
        setProjects(nextProjects ?? []);
        setMetrics(nextMetrics ?? { ...defaultMetrics });
        setHistoryChat(nextHistoryChat);
      } finally {
        if (active) {
          setIsLoadingBlogs(false);
          setIsLoadingProjects(false);
          setIsLoadingMetrics(false);
          setIsLoadingHistoryChat(false);
        }
      }
    };

    void hydrateContent();

    return () => {
      active = false;
    };
  }, []);

  const refreshHistory = useCallback(async () => {
    setIsLoadingHistoryChat(true);

    const historyChat = await getHistoryChat(true);
    setHistoryChat(historyChat);
    setIsLoadingHistoryChat(false);

    return historyChat;
  }, []);

  return (
    <ContentContext.Provider
      value={{
        blogs,
        projects,
        isLoadingBlogs,
        isLoadingProjects,
        metrics,
        isLoadingMetrics,
        historyChat,
        isLoadingHistoryChat,
        refreshHistory,
      }}
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
