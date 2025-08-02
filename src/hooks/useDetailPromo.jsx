import { useState, useEffect } from "react";
import { getItemById } from "@/lib/local_data";

export const useDetailPromo = (id) => {
  const [detailPromo, setDetailPromo] = useState(null);
  const getDetailPromo = async (id) => {
    try {
      const response = await getItemById("promos", id);
      setDetailPromo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailPromo(id);
    }
  }, [id]);

  return {
    detailPromo,
    getDetailPromo,
  };
};
