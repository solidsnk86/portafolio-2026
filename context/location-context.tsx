"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LocationProps {
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

const LocationContext = createContext<LocationProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Pick<LocationProps, "data">>({
    data: {
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
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | TypeError | undefined>(undefined);

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
