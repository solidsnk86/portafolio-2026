"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LastAccessProps {
  id: string;
  ip: string;
  city_name: string;
  country_name: string;
  so: string;
  browser: string;
  version: string;
  emoji_flag: string;
  lat: number;
  lon: number;
  created_at?: Date | string;
}
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
    lastAccess: LastAccessProps;
  };
}

const LocationContext = createContext<LocationProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Pick<LocationProps, "data">>({
    data: {
      ip: "",
      city: {
        name: "",
        postalCode: "",
      },
      country: {
        name: "",
        alpha: "",
        emojiFlag: "",
        timezone: "",
      },
      coords: {
        latitude: "",
        longitude: "",
      },
      sysInfo: {
        language: "",
        system: "",
        webBrowser: {
          browser: "",
          version: "",
        },
      },
      lastAccess: {
        id: "",
        ip: "",
        city_name: "",
        country_name: "",
        so: "",
        browser: "",
        version: "",
        emoji_flag: "",
        lat: 0,
        lon: 0,
      },
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | TypeError | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [locationFetch, collectionFecth] = await Promise.all([
          await fetch("https://solid-geolocation.vercel.app/location"),
          await fetch("/api/collection/get-collection"),
        ]);
        const locationJson = await locationFetch.json();
        const collectionJson = await collectionFecth.json();

        setLocation({ data: locationJson });
        setLocation((prev) => ({
          ...prev,
          data: { ...prev.data, lastAccess: collectionJson.data },
        }));
      } catch (error) {
        setError(error as TypeError);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

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
