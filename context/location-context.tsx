"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LastAccessProps {
  data: {
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
  };
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
    lastAccess: LastAccessProps | undefined;
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
        data: {
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
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | TypeError | undefined>(undefined);
  const [lastAccess, setLastAccess] = useState<LastAccessProps>();

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

  const getLastCollectionData = async () => {
    await fetch("/api/collection/get-collection")
      .then((res) => res.json())
      .then((data) => setLastAccess(data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getLastCollectionData();
  }, []);

  const value = {
    isLoading,
    error,
    data: location.data,
    lastAccess,
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
