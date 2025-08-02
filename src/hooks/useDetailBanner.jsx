import { useState, useEffect } from "react";
import { getItemById } from "@/lib/local_data";

export const useDetailBanner = (id) => {
  const [detailBanner, setDetailBanner] = useState(null);
  const getDetailBanner = async (id) => {
    try {
      const response = await getItemById("banners", id);
      setDetailBanner(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailBanner(id);
    }
  }, [id]);

  return {
    detailBanner,
    getDetailBanner,
  };
};
