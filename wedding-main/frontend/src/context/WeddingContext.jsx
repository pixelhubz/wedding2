import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { weddingConfig as fallbackConfig } from "@/config/wedding";

const WeddingContext = createContext({ config: fallbackConfig, loading: true, error: null });

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const WeddingProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API}/wedding`, { timeout: 8000 });
        if (!cancelled) {
          setConfig(res.data);
          setLoading(false);
        }
      } catch (e) {
        // Fall back to static config so the invitation still shows.
        console.warn("Falling back to static wedding config:", e?.message);
        if (!cancelled) {
          setConfig(fallbackConfig);
          setError(e);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <WeddingContext.Provider value={{ config: config || fallbackConfig, loading, error }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => useContext(WeddingContext);
