import useSWR from "swr";
import { getItemById } from "@/lib/local_data";

const fetcher = async (url) => {
  // Extract ID from URL
  const id = url.split("/").pop();
  console.log("Fetching activity with ID:", id);
  const response = await getItemById("activities", id);
  console.log("Activity data:", response);
  return response.data;
};

export const useSWRDetailActivity = (id, fallbackData) => {
  const { data, error, isLoading } = useSWR(
    id ? `/activities/${id}` : null,
    fetcher,
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
    }
  );

  return {
    detailActivity: data,
    isLoading,
    error,
  };
};
