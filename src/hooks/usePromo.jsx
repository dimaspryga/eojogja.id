import useSWR from "swr";
import { fetchLocalData } from "@/lib/local_data";

const fetcher = async () => {
  return await fetchLocalData("promos");
};

export const usePromo = () => {
  const { data, error, isLoading, mutate } = useSWR("promos", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    promo: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};
