"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface LocationProps {
  isLoading: boolean;
  error: TypeError | Error | undefined;
  data: {
    ip: string;
    city: {
      name: string;
      postalCode: string;
    };
    country: {
      name: string;
      alpha: string;
      emojiFlag: string;
      timezone: string;
    };
    coords: { latitude: string | number; longitude: string | number };
    sysInfo: {
      language: string;
      system: string;
      webBrowser: {
        browser: string;
        version: string;
      };
    };
  };
}
interface LastAccessProps {
  data: {
    ip: string;
    city_name: string;
    country_name: string;
    so: string;
    browser: string;
    version: string;
    emoji_flag: string;
    lat: number;
    lon: number;
  };
}
const initialData = {
  ip: "n/a",
  city: {
    name: "n/a",
    postalCode: "n/a",
  },
  country: {
    name: "n/a",
    alpha: "n/a",
    emojiFlag: "n/a",
    timezone: "n/a",
  },
  coords: {
    latitude: "n/a",
    longitude: "n/a",
  },
  sysInfo: {
    language: "n/a",
    system: "n/a",
    webBrowser: {
      browser: "n/a",
      version: "n/a",
    },
  },
};

const LocationContext = createContext<LocationProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Pick<LocationProps, "data">>({
    data: initialData,
  });
  const [lastAccess, setLastAccess] = useState<LastAccessProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | TypeError | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postedIpRef = useRef<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      await fetch("https://solid-geolocation.vercel.app/location")
        .then((res) => res.json())
        .then((data) => {
          setLocation({ data });
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    };

    getLocation();
  }, []);

  const getCollection = useCallback(async () => {
    await fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => setLastAccess({ data }))
      .catch((err) => setError(err));
  }, []);

  const collectData = useCallback(async (data: LocationProps["data"]) => {
    await fetch("/api/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  useEffect(() => {
    const currentIP = location.data.ip;
    const lastIP = lastAccess?.data.ip;

    if (!currentIP || currentIP === lastIP || postedIpRef.current === currentIP) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      postedIpRef.current = currentIP;
      collectData(location.data);
    }, 600);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [collectData, lastAccess?.data.ip, location.data]);

  const value = {
    isLoading,
    error,
    data: location.data,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("El contexto debe usarse dentro del provider.");
  }
  return context;
};
