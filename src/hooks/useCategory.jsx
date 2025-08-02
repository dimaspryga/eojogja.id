import { useEffect, useState, useCallback } from "react";
import { fetchLocalData } from "@/lib/local_data";

export const useCategory = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchLocalData("categories");
      setCategory(response.data || []);
    } catch (err) {
      console.error("Gagal mengambil data kategori:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    category,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};
