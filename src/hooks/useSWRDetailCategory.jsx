import useSWR from "swr";
import { getItemById } from "@/lib/local_data";

const fetcher = async (id) => {
  const response = await getItemById("categories", id);
  return response.data;
};

export const useSWRDetailCategory = (id, fallbackData) => {
  const { data, error, isLoading } = useSWR(id ? id : null, fetcher, {
    fallbackData: fallbackData,
    revalidateOnFocus: false,
  });

  return {
    detailCategory: data,
    isLoading,
    error,
  };
};
