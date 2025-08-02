import { useState, useEffect } from "react";
import { getItemById } from "@/lib/local_data";

export const useDetailCategory = (id) => {
  const [detailCategory, setDetailCategory] = useState(null);
  const getDetailCategory = async (id) => {
    try {
      const response = await getItemById("categories", id);
      setDetailCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailCategory(id);
    }
  }, [id]);

  return {
    detailCategory,
    getDetailCategory,
  };
};
