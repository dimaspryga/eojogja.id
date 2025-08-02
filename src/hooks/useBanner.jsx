import { useState, useEffect, useCallback } from "react";
import { fetchLocalData } from "@/lib/local_data";

export const useBanner = () => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const getBanner = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchLocalData("banners");
      console.log("Fetched banners:", response);
      setBanner(response.data || []);
      setIsError(false);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
      setIsError(true);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  return {
    banner,
    getBanner,
    loading,
    isError,
    error,
  };
};
