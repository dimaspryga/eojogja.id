import { useState, useEffect, useCallback } from "react";
import { fetchLocalData } from "@/lib/local_data";

export const useActivity = () => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchLocalData("activities");
      console.log("Fetched activities:", response.data?.length || 0);
      if (!response.data) {
        console.warn("No data property in response:", response);
      }
      setActivity(response.data || []);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activity,
    isLoading,
    error,
    refetch: fetchActivities,
  };
};
