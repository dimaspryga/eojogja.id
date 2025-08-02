import { useState, useEffect } from "react";
import { getItemById } from "@/lib/local_data";

export const useDetailActivity = (id) => {
  const [detailActivity, setDetailActivity] = useState(null);
  const getDetailActivity = async (id) => {
    try {
      const response = await getItemById("activities", id);
      setDetailActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailActivity(id);
    }
  }, [id]);

  return {
    detailActivity,
    getDetailActivity,
  };
};
