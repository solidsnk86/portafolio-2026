"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
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
  messages: string;
  city_name: string;
  country_name: string;
  created_at: Date | string;
}

type MetricsEntry = {
  geoRequests: number;
  neoWifiUsers: number;
  downloadCount: number;
  apkDownloadsCount: number;
};

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
  refreshHistory: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | undefined>(
  undefined,
);

async function fetchHistoryData(): Promise<HistoryChat | null> {
  try {
    const res = await fetch("/api/collection/history/last-connection");
    const data = await res.json();
    return data?.success ? (data.data ?? null) : null;
  } catch {
    return null;
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const [metrics, setMetrics] = useState<MetricsEntry>(defaultMetrics);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  const [historyChat, setHistoryChat] = useState<HistoryChat | null>(null);
  const [isLoadingHistoryChat, setIsLoadingHistoryChat] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data?.blog ?? []);
      } catch {
        setBlogs([]);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data?.allProjects ?? []);
      } catch {
        setProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/metrics");
        const data = await res.json();
        setMetrics({
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
        });
      } catch {
        setMetrics(defaultMetrics);
      } finally {
        setIsLoadingMetrics(false);
      }
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const result = await fetchHistoryData();
      setHistoryChat(result);
      setIsLoadingHistoryChat(false);
    };

    loadHistory();
  }, []);

  const refreshHistory = useCallback(async () => {
    setIsLoadingHistoryChat(true);
    const result = await fetchHistoryData();
    setHistoryChat(result);
    setIsLoadingHistoryChat(false);
  }, []);

  const values: ContentContextValue = {
    blogs,
    projects,
    isLoadingBlogs,
    isLoadingProjects,
    metrics,
    isLoadingMetrics,
    historyChat,
    isLoadingHistoryChat,
    refreshHistory,
  };

  return (
    <ContentContext.Provider value={values}>
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