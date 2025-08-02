import { useState, useEffect } from "react";
import { fetchLocalData } from "@/lib/local_data";

export const useActivityByCategory = (id) => {
  const [activityByCategory, setActivityByCategory] = useState([]);

  const getActivityByCategory = async (id) => {
    try {
      const response = await fetchLocalData("activities");
      const filteredActivities = response.data.filter(
        (activity) => activity.category_id === parseInt(id)
      );
      setActivityByCategory(filteredActivities || []);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (id) getActivityByCategory(id);
  }, [id]);

  return {
    activityByCategory,
  };
};
